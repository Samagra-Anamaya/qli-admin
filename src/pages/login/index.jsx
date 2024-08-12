import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import LoginBackgroundImage from "../../assets/track_login_pic.png";

function Login() {
  // const defaultTheme = createTheme();
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_SERVICE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch(`${BASE_URL}/ste/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.get("userId"),
        password: data.get("password"),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          localStorage.setItem("token", data.token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 3);
          localStorage.setItem("expiration", expiration.toISOString());
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    // <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={6}
        md={7.6}
        // sx={{
        // backgroundImage: `url(${LoginBackgroundImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundColor: (t) =>
        //   t.palette.mode === "light"
        //     ? t.palette.grey[50]
        //     : t.palette.grey[900],
        // // backgroundSize: "contain",
        // backgroundPosition: "center",
        // width:"100%",
        // height: "100vh",
        // }}
      >
        <img src={LoginBackgroundImage} width={"100%"} height={"100%"} />
      </Grid>
      <Grid item xs={12} sm={6} md={4.4} component={Paper} elevation={3} square>
        <Box
          sx={{
            mx: 8,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
            my: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <Avatar sx={{ p: "8px", bgcolor: "#878586" }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h4" variant="h4" sx={{ fontWeight: "600" }}>
              Sign in
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="User ID"
              name="userId"
              autoComplete="userId"
              sx={{
                bgcolor: "#F6F6F6",
                "&:active": {
                  bgcolor: "#F6F6F6",
                  color: "#878586",
                  borderColor: "#878586",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ bgcolor: "#F6F6F6" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                my: 8,
                textTransform: "none",
                bgcolor: "#C5C4C5",
                "&:hover": {
                  bgcolor: "#B0AFB0",
                },
                "&:active": {
                  bgcolor: "#9B9A9B",
                },
                // bgcolor: "#02816A",
                // "&:hover": {
                //   bgcolor: "#307360",
                // },
                // "&:active": {
                //   bgcolor: "#307360",
                // },
              }}
            >
              <span style={{ fontWeight: "600", fontSize: "18px" }}>
                Log In
              </span>
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
    // </ThemeProvider>
  );
}

export default Login;
