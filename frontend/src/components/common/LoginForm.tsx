// frontend/src/components/common/LoginForm.tsx
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