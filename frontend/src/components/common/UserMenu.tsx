// frontend/src/components/common/UserMenu.tsx
import { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar autenticación
  const username = localStorage.getItem('username') || 'Usuario'; // Obtener nombre del usuario

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login'; // Redirigir al login
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ color: 'white' }}>
        <Avatar sx={{ bgcolor: 'primary.dark', width: 32, height: 32 }}>
          {username[0].toUpperCase()}
        </Avatar>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {isAuthenticated ? username : 'Registro/Iniciar Sesión'}
        </Typography>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {isAuthenticated ? (
          <>
            <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
              Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              Cerrar Sesión
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
              Registrarse
            </MenuItem>
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Iniciar Sesión
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}