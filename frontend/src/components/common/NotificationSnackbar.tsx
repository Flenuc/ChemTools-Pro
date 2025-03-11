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