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