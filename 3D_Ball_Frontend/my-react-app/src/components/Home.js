import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography, Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate('/register');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          mb: 2,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Welcome To Home Project From RTC League
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToRegister}
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={goToLogin}
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
