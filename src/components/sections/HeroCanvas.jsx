import { useEffect, useRef } from 'react'
import s from './Hero.module.css'

// La ciudad de noche: un damero en perspectiva con avenidas, manzanas encendidas
// y pulsos que recorren las calles. Un solo triángulo, un solo draw call.
const VERTEX = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Línea de grilla con antialias; se apaga cuando es más fina que un píxel.
float gridLine(float v, float w) {
  float d = abs(fract(v - 0.5) - 0.5);
  float aa = fwidth(v);
  return (1.0 - smoothstep(w, w + aa * 1.5, d)) * clamp(w * 2.5 / aa, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float horizon = 0.14 + uPointer.y * 0.012;
  float dy = uv.y - horizon;

  vec3 night = vec3(0.024, 0.035, 0.078);
  float spread = exp(-uv.x * uv.x * 2.2);
  vec3 col = night
    + vec3(0.02, 0.10, 0.34) * exp(-abs(dy) * 7.0) * (0.55 + 0.45 * spread)
    + vec3(0.12, 0.42, 1.0) * 0.5 * exp(-abs(dy) * 55.0) * spread;

  if (dy < 0.0) {
    float z = 0.9 / -dy;
    vec2 p = vec2(uv.x * z * 1.7 + uPointer.x * 0.5, z + uTime * 0.3);

    float streets = max(gridLine(p.x, 0.018), gridLine(p.y, 0.018));
    float avenues = max(gridLine(p.x / 4.0, 0.012), gridLine(p.y / 4.0, 0.012));

    float row = floor(p.y + 0.5);
    float lane = floor(p.x + 0.5);
    float alongX = fract(p.x * 0.07 - uTime * (0.10 + 0.18 * hash(vec2(row, 1.0))) + hash(vec2(row, 7.0)));
    float alongZ = fract(p.y * 0.07 + uTime * (0.08 + 0.16 * hash(vec2(lane, 3.0))) + hash(vec2(lane, 9.0)));
    float pulses =
      gridLine(p.y, 0.03) * smoothstep(0.93, 1.0, alongX) * step(0.62, hash(vec2(row, 5.0))) +
      gridLine(p.x, 0.03) * smoothstep(0.93, 1.0, alongZ) * step(0.62, hash(vec2(lane, 11.0)));

    vec2 cell = floor(p);
    vec2 f = fract(p);
    float block = step(0.16, f.x) * step(f.x, 0.84) * step(0.16, f.y) * step(f.y, 0.84);
    float lit = step(0.88, hash(cell)) * (0.55 + 0.45 * sin(uTime * 0.5 + hash(cell + 2.0) * 6.2831));

    float fog = exp(-z * 0.055);
    vec3 ground =
      vec3(0.10, 0.32, 0.95) * streets * 0.30 +
      vec3(0.18, 0.56, 1.0) * avenues * 0.55 +
      vec3(0.55, 0.82, 1.0) * pulses * 1.5 +
      vec3(0.96, 0.86, 0.0) * lit * block * 0.09;
    col += ground * fog;
  }

  // Viñeta suave para que el texto respire en los bordes.
  col *= 1.0 - 0.35 * dot(uv * vec2(0.7, 1.1), uv * vec2(0.7, 1.1));
  outColor = vec4(col, 1.0);
}`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader))
  return shader
}

export default function HeroCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    let program
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    } catch {
      return // queda el fondo CSS
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'uRes')
    const uTime = gl.getUniformLocation(program, 'uTime')
    const uPointer = gl.getUniformLocation(program, 'uPointer')

    const resize = () => {
      const scale = Math.min(devicePixelRatio, 1.5) * 0.8
      canvas.width = Math.round(canvas.clientWidth * scale)
      canvas.height = Math.round(canvas.clientHeight * scale)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e) => {
      pointer.tx = (e.clientX / innerWidth) * 2 - 1
      pointer.ty = (e.clientY / innerHeight) * 2 - 1
    }
    addEventListener('pointermove', onMove, { passive: true })

    let frame = 0
    let visible = true
    let first = true
    const start = performance.now()
    const render = (now) => {
      frame = 0
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04
      gl.uniform1f(uTime, (now - start) / 1000)
      gl.uniform2f(uPointer, pointer.x, pointer.y)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (first) {
        first = false
        canvas.dataset.ready = 'true'
      }
      schedule()
    }
    const schedule = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render)
    }

    // No se dibuja nada mientras el hero está fuera de pantalla o la pestaña oculta.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })
    io.observe(canvas)
    document.addEventListener('visibilitychange', schedule)
    const onLost = (e) => {
      e.preventDefault()
      cancelAnimationFrame(frame)
      canvas.dataset.ready = 'false'
    }
    canvas.addEventListener('webglcontextlost', onLost)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      io.disconnect()
      removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', schedule)
      canvas.removeEventListener('webglcontextlost', onLost)
    }
  }, [])

  return <canvas ref={ref} className={s.canvas} data-ready="false" aria-hidden="true" />
}
