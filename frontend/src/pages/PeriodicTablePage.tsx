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