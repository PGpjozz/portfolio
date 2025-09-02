// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Stack, Link as MuiLink, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function Navbar({ handleScroll }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${apiBaseUrl}/api/profile-picture/`)
      .then((res) => {
        if (isMounted && res.data && res.data.image) {
          setProfilePicUrl(`${apiBaseUrl}${res.data.image}`);
        }
      })
      .catch(() => {})
      .finally(() => {
        // no-op
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();
    if (location.pathname === "/") {
      handleScroll(event, sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  // Dynamic hover effect with animated underline
  const linkStyles = {
    position: "relative",
    color: "inherit",
    textDecoration: "none",
    fontWeight: "medium",
    fontSize: "1rem",
    cursor: "pointer",
    px: 1,
    py: 0.5,
    transition: "color 0.3s ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "0%",
      height: "2px",
      backgroundColor: "primary.main",
      transition: "width 0.3s ease",
    },

    "&:hover": {
      color: "primary.main",
    },

    "&:hover::after": {
      width: "100%",
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottom: "1px solid #ddd",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          width: "90%",
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src={profilePicUrl || ""}
            alt="Profile"
            sx={{ width: 36, height: 36, boxShadow: 1 }}
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold", cursor: "default" }}>
            Miyelani Mashimbyi
          </Typography>
        </Stack>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={openMenu} aria-label="Open navigation menu">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} keepMounted>
              <MenuItem
                onClick={(e) => {
                  closeMenu();
                  handleNavClick(e, "summary");
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  closeMenu();
                  handleNavClick(e, "projects");
                }}
              >
                Projects
              </MenuItem>
              <MenuItem component={RouterLink} to="/about" onClick={closeMenu}>
                About
              </MenuItem>
              <MenuItem component={RouterLink} to="/contact" onClick={closeMenu}>
                Contact
              </MenuItem>
              <MenuItem component={RouterLink} to="/services" onClick={closeMenu}>
                Services
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
            <MuiLink
              href="#summary"
              sx={linkStyles}
              onClick={(e) => handleNavClick(e, "summary")}
            >
              Home
            </MuiLink>

            <MuiLink
              href="#projects"
              sx={linkStyles}
              onClick={(e) => handleNavClick(e, "projects")}
            >
              Projects
            </MuiLink>
            <MuiLink component={RouterLink} to="/about" sx={linkStyles}>
              About
            </MuiLink>

            <MuiLink component={RouterLink} to="/contact" sx={linkStyles}>
              Contact
            </MuiLink>

            <MuiLink component={RouterLink} to="/services" sx={linkStyles}>
              Services
            </MuiLink>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
