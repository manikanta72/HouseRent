import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { message } from 'antd';

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data?.name || !data?.email || !data?.password || !data?.type) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    axios.post('http://localhost:8001/api/user/register', data)
      .then((response) => {
        setLoading(false);

        if (response.data.success) {
          message.success(response.data.message);
          navigate('/login');
        } else {
          message.error(response.data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        message.error("Registration failed");
      });
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <Navbar expand="lg" className="custom-navbar">
        <Container fluid>
          <Navbar.Brand className="brand-text">RentEase</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto gap-3">
              <Link className="nav-link-custom" to="/">Home</Link>
              <Link className="nav-link-custom" to="/login">Login</Link>
              <Link className="nav-link-custom" to="/register">Register</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ================= REGISTER FORM ================= */}
      <Container component="main" className="login-container">
        <Box className="login-card">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" className="login-title">
            Sign Up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Renter Full Name / Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              value={data.password}
              onChange={handleChange}
              label="Password"
              type="password"
              autoComplete="current-password"
            />

            <Box mt={2}>
              <InputLabel>User Type</InputLabel>
              <Select
                fullWidth
                name="type"
                value={data.type}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Select User</MenuItem>
                <MenuItem value="Renter">Renter</MenuItem>
                <MenuItem value="Owner">Owner</MenuItem>
              </Select>
            </Box>

            <Box mt={3} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                className="login-btn"
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Sign Up"}
              </Button>
            </Box>

            <Grid container className="login-links">
              <Grid item xs={12}>
                Already have an account?
                <Link to="/login" className="signup-link">
                  {" Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register;