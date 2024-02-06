// src/pages/Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Container, TextField, Paper } from "@mui/material";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      setError(null);

    
      if (!email || !password || !confirmPassword) {
        setError("Tutti i campi sono obbligatori.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Le password non corrispondono.");
        return;
      }

     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("Utente registrato con successo!", userCredential.user);

    
      toast.success("Account creato con successo!");

     
    } catch (error) {
      setError(error.message);
      console.error("Errore durante la registrazione:", error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registrazione
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
        <TextField
          type="password"
          label="Conferma Password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
        >
          Registrati
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
          Hai già un account? <Link to="/login">Accedi</Link>
        </Typography>
      </Paper>
    
      <ToastContainer />
    </Container>
  );
};

export default Register;
