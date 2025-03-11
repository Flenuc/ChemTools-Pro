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