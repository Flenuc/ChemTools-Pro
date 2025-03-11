// frontend/src/components/common/CompoundForm.tsx
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