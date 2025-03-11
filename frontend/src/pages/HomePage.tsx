import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '50px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Bienvenido a ChemTools Pro
      </Typography>
      <Typography variant="body1" paragraph>
        ChemTools Pro es una plataforma educativa y práctica para el estudio y análisis químico. Aquí podrás acceder a herramientas interactivas, realizar cálculos químicos y explorar la tabla periódica.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/periodic-table"
        sx={{ mt: 3 }}
      >
        Explorar Tabla Periódica
      </Button>
    </Box>
  );
};

export default HomePage;