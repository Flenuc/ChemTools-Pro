// frontend/src/components/common/Navbar.tsx
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ChemTools Pro
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/periodic-table">
          Tabla Periódica
        </Button>
        <UserMenu />
        <Button color="inherit" component={Link} to="/compounds">  {/* [NUEVO] */}
          Compuestos
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;