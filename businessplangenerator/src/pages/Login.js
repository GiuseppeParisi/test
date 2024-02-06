import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Container, TextField, Paper } from "@mui/material";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      setError(null);

     
      if (!email || !password) {
        setError("Email e password sono obbligatorie.");
        return;
      }

     
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Accesso effettuato con successo!");

      
      toast.success("Accesso effettuato con successo!");

     
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
      console.error("Errore durante l'accesso:", error.message);

  
      toast.error("Errore durante l'accesso. Verifica le credenziali.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Accesso
        </Typography>
        {error && (
          <Typography variant="body1" color="error" paragraph>
            {error}
          </Typography>
        )}
        <TextField
          type="email"
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Accedi
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Non hai un account? <Link to="/register">Registrati</Link>
        </Typography>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default Login;
