# frontend\src\App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PeriodicTablePage from './pages/PeriodicTablePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/periodic-table" element={<PeriodicTablePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;

# frontend\src\components\common\Footer.tsx

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

# frontend\src\components\common\FormularioEjemplo.tsx

import { TextField, Button } from '@mui/material';

const FormularioEjemplo = () => {
  return (
    <form>
      <TextField label="Nombre del compuesto" fullWidth margin="normal" />
      <TextField label="Fórmula química" fullWidth margin="normal" />
      <Button variant="contained" type="submit">
        Guardar
      </Button>
    </form>
  );
};

export default FormularioEjemplo;

# frontend\src\components\common\Navbar.tsx

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


# frontend/src/components/common/CompoundForm.tsx

import { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';

interface CompoundFormProps {
  onSuccess: () => void;
  editingId?: string | null;
  onCancel: () => void;
}

export default function CompoundForm({ onSuccess, editingId, onCancel }: CompoundFormProps) {
  const [name, setName] = useState('');
  const [formula, setFormula] = useState('');

  // Cargar datos para edición
  useEffect(() => {
    if (editingId) {
      const loadCompound = async () => {
        const response = await fetch(`http://localhost:4000/api/compounds/${editingId}`);
        const data = await response.json();
        setName(data.name);
        setFormula(data.formula);
      };
      loadCompound();
    }
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId 
        ? `http://localhost:4000/api/compounds/${editingId}`
        : 'http://localhost:4000/api/compounds';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'token-valido',
        },
        body: JSON.stringify({ name, formula }),
      });

      if (response.ok) {
        onSuccess();
        if (!editingId) {
          setName('');
          setFormula('');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Fórmula"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          fullWidth
          required
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained">
            {editingId ? 'Actualizar' : 'Crear Compuesto'}
          </Button>
          {editingId && (
            <Button variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Stack>
      </Stack>
    </form>
  );
}

# frontend/src/components/common/LoginForm.tsx

import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { NotificationSnackbar } from './NotificationSnackbar';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setNotification({ type: 'success', message: 'Autenticación exitosa' });
        // Guardar token y redirigir (ejemplo simplificado)
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        window.location.href = '/';
      } else {
        const errorMsg = data.message === 'Credenciales inválidas' 
          ? 'Usuario no registrado o contraseña incorrecta' 
          : 'Error en el login';
        setNotification({ type: 'error', message: errorMsg });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error de conexión' });
    }
  };

    const handleClose = () => {
        setNotification(null);
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" type="email" fullWidth margin="normal" required 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" required 
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>Iniciar Sesión</Button>
      </form>

      {notification && (
        <NotificationSnackbar
          open={Boolean(notification)}
          severity={notification.type}
          message={notification.message}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

# frontend\src\components\common\RegistrationForm.tsx

// frontend/src/components/common/RegistrationForm.tsx
import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { NotificationSnackbar } from './NotificationSnackbar';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setNotification({ type: 'success', message: 'Usuario registrado exitosamente' });
        setTimeout(() => {
          window.location.href = '/login';  // Redirección a login
        }, 2000);
      } else {
        // Manejar errores específicos del backend
        const errorMsg = data.message.includes('duplicate key') 
          ? 'El email ya está registrado' 
          : 'Error en el registro';
        setNotification({ type: 'error', message: errorMsg });
      }
    } catch (error) {
      setNotification({ type: 'error', message: 'Error de conexión' });
    }
  };

  const handleClose = () => {
    setNotification(null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" required 
          value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Email" type="email" fullWidth margin="normal" required 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" required 
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" fullWidth>Registrarse</Button>
      </form>
      
      {notification && (
        <NotificationSnackbar
          open={Boolean(notification)}
          severity={notification.type}
          message={notification.message}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

# frontend\src\components\common\UserMenu.tsx

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

# frontend\src\components\common\NotificationSnackbar.tsx

// frontend/src/components/common/NotificationSnackbar.tsx
import { Snackbar, Alert, AlertColor } from '@mui/material';

// Define una interfaz para las props
interface NotificationSnackbarProps {
  open: boolean;
  severity: AlertColor;
  message: string;
  onClose: () => void;
}

export const NotificationSnackbar = ({ 
  open, 
  severity, 
  message, 
  onClose 
}: NotificationSnackbarProps) => {
  return (
    <Snackbar 
      open={open} 
      autoHideDuration={4000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

# frontend\src\data\elements.json

[
    { "symbol": "H", "atomicNumber": 1 },
    { "symbol": "He", "atomicNumber": 2 }
    
]

# frontend\src\pages\HomePage.tsx

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

# frontend\src\pages\NotFoundPage.tsx

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

# frontend\src\pages\PeriodicTablePage.tsx

import { Grid, Paper, Typography } from '@mui/material';
import elements from '../data/elements.json'; // Archivo estático con datos de elementos

const PeriodicTablePage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Tabla Periódica Básica
      </Typography>
      <Grid container spacing={2}>
        {elements.map((element) => (
          <Grid item xs={2} key={element.symbol}>
            <Paper elevation={3} style={{ padding: '10px', textAlign: 'center' }}>
              <Typography variant="subtitle1">{element.symbol}</Typography>
              <Typography variant="caption">{element.atomicNumber}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PeriodicTablePage;

# frontend\src\pages\CompoundsPage.tsx

// frontend/src/pages/CompoundsPage.tsx
import { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, IconButton, Box, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CompoundForm from '../components/common/CompoundForm';
import { NotificationSnackbar } from '../components/common/NotificationSnackbar';

export default function CompoundsPage() {
  const [compounds, setCompounds] = useState<any[]>([]);
  const [editingCompound, setEditingCompound] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ open: boolean; type: 'success' | 'error'; message: string }>({ 
    open: false, 
    type: 'success', 
    message: '' 
  });

  // Obtener compuestos
  const fetchCompounds = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/compounds', {
        headers: { 'Authorization': 'token-valido' },
      });
      const data = await response.json();
      setCompounds(data);
    } catch (error) {
      setNotification({ open: true, type: 'error', message: 'Error al cargar compuestos' });
    }
  };

  // Eliminar compuesto
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/compounds/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'token-valido' },
      });
      
      if (response.ok) {
        setNotification({ open: true, type: 'success', message: 'Compuesto eliminado' });
        fetchCompounds();
      }
    } catch (error) {
      setNotification({ open: true, type: 'error', message: 'Error al eliminar' });
    }
  };

  useEffect(() => {
    fetchCompounds();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Compuestos Químicos</Typography>
      
      {/* Formulario para crear/editar */}
      <CompoundForm 
        onSuccess={fetchCompounds} 
        editingId={editingCompound}
        onCancel={() => setEditingCompound(null)}
      />

      {/* Lista de compuestos */}
      <List>
        {compounds.map((compound) => (
          <ListItem 
            key={compound._id}
            secondaryAction={
              <>
                <IconButton onClick={() => setEditingCompound(compound._id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(compound._id)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
        <ListItemText 
          primary={`${compound.name} (${compound.formula})`} 
          secondary={`Masa molar: ${compound.properties?.molarMass?.toFixed(2) || 'Cálculo pendiente'}`} 
        />
          </ListItem>
        ))}
      </List>

      <NotificationSnackbar
        open={notification.open}
        severity={notification.type}
        message={notification.message}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Box>
  );
}

