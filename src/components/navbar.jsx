import * as React from "react";
import {
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  AppBar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");

    navigate("/");
  };

  return (
    <Box sx={{ height: "50px" }}>
      <AppBar
        position="static"
        style={{
          // width: "100%",
          height: "100%",
          background: "linear-gradient(90deg, rgba(250,171,62,1) 35%, rgba(254,150,74,1) 100%)",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Toolbar>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
