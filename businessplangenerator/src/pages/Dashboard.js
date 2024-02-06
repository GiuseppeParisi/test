import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import Form from "../components/Form";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        const fetchedForms = [];
        querySnapshot.forEach((doc) => {
          fetchedForms.push({ id: doc.id, ...doc.data() });
        });
        setForms(fetchedForms);
        setLoading(false);
      } catch (error) {
        console.error("Errore durante il recupero dei dati:", error.message);
      }
    };

    fetchForms();
  }, []);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Errore durante il logout:", error.message);
    }
  };

  const handleSaveForm = async (formData) => {
    try {
      const docRef = await addDoc(collection(db, "forms"), formData);
      setForms((prevForms) => [...prevForms, { id: docRef.id, ...formData }]);
      handleCloseForm();
    } catch (error) {
      console.error("Errore durante il salvataggio del form su Firebase:", error.message);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Business Plan Generator
          </Typography>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {currentUser && currentUser.email}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box mt={8}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Nested List Items
                </ListSubheader>
              }
            >
              <ListItemButton onClick={handleOpenForm}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Crea Business Plan" />
              </ListItemButton>
            </List>
          </Grid>
          <Grid item xs={8}>
            <Container>
              <Grid container spacing={2}>
                {loading ? (
                  <Typography variant="h4" align="center" gutterBottom>
                    Loading...
                  </Typography>
                ) : (
                  forms.map((form) => (
                    <Grid key={form.id} item xs={12} sm={6} md={4} lg={3}>
                      <Card>
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {form.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {form.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Crea Business Plan</DialogTitle>
        <DialogContent>
          <Form onSave={handleSaveForm} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Annulla</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
