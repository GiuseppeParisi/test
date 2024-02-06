import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Container, Box, Paper } from "@mui/material";


const Home = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Benvenuto nel Business Plan Generator
        </Typography>
        <Typography variant="body1" paragraph>
          Descrizione del tuo sito. Aggiungi qui una descrizione che spiega cosa offre il tuo servizio.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" component={Link} to="/register">
            Registrati
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/login">
            Accedi
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
