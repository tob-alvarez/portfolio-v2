/**
 * Corre `update` dentro de una View Transition cuando el navegador la soporta y el usuario
 * acepta movimiento; si no, lo aplica directo. Devuelve la transición o null.
 */
export function viewTransition(update) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduce) {
    update()
    return null
  }
  const vt = document.startViewTransition(update)
  // El navegador la aborta si la pestaña está oculta; el cambio de estado se aplica igual.
  vt.ready.catch(() => {})
  vt.finished.catch(() => {})
  return vt
}
