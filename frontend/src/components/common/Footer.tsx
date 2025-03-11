import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 'auto' }}>
      <Typography variant="body1" align="center" color="white">
        © 2024 ChemTools Pro. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;