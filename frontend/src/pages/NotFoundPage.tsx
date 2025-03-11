import { Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <Typography variant="h3">404 - Página no encontrada</Typography>
      <Typography variant="body1">
        La página que estás buscando no existe.
      </Typography>
    </div>
  );
};

export default NotFoundPage;