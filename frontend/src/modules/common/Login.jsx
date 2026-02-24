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
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { message } from 'antd';

const Login = () => {
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

    if (!data?.email || !data?.password) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    axios.post('http://localhost:8001/api/user/login', data)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          message.success(res.data.message);

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          const isLoggedIn = JSON.parse(localStorage.getItem("user"));

          switch (isLoggedIn.type) {
            case "Admin":
              navigate("/adminhome");
              break;
            case "Renter":
              navigate("/renterhome");
              break;
            case "Owner":
              if (isLoggedIn.granted === 'ungranted') {
                message.error('Your account is not yet confirmed by the admin');
              } else {
                navigate("/ownerhome");
              }
              break;
            default:
              navigate("/login");
              break;
          }

          setTimeout(() => window.location.reload(), 1000);
        } else {
          message.error(res.data.message);
        }
      })
      .catch(() => {
        setLoading(false);
        message.error("Invalid credentials");
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

      {/* ================= LOGIN FORM ================= */}
      <Container component="main" className="login-container">
        <Box className="login-card">
          <Avatar className="login-avatar">
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" className="login-title">
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              name="email"
              value={data.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
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

            <Box mt={3} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                className="login-btn"
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
              </Button>
            </Box>

            <Grid container className="login-links">
              <Grid item xs={12}>
                Forgot password?
                <Link to="/forgotpassword" className="forgot-link">
                  {" Click here"}
                </Link>
              </Grid>
              <Grid item xs={12}>
                Don’t have an account?
                <Link to="/register" className="signup-link">
                  {" Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Login;