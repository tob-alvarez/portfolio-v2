import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const Elevador = () => {
  const [showElevador, setShowElevador] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowElevador(true);
      } else {
        setShowElevador(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const volverArriba = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
      <Button
        onClick={volverArriba}
        variant="contained"
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '30px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff60',
          color: '#fff',
          fontSize: '20px',
          display: showElevador ? 'block' : 'none', // Ajuste la visibilidad aquí
        }}
      >
        ↑
      </Button>
  );
};

export default Elevador;
