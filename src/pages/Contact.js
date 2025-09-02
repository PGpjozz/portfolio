import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
  Paper,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    document.title = "Contact | Portfolio";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/api/contact/`, formData);
      setSnackbar({
        open: true,
        message: "Message sent successfully!",
        severity: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setSnackbar({
        open: true,
        message:
          "There was an error sending your message. Please try again later.",
        severity: "error",
      });
    }
  };

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar handleScroll={handleScroll} />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: "100%", maxWidth: 800 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 3,
              backdropFilter: "blur(4px)",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 2, textAlign: "center" }}
            >
              Contact Me
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 4,
                textAlign: "center",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              I'd love to hear from you — whether it's about a project,
              collaboration, or just saying hi. You can email me at{" "}
              <Link href="mailto:miyelaniclimate@gmail.com">
                miyelaniclimate@gmail.com
              </Link>{" "}
              or fill out this form.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    required
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      px: 5,
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Or find me on
              </Typography>
              <Box>
                <IconButton
                  href="https://github.com/yourusername"
                  target="_blank"
                  color="inherit"
                >
                  <GitHubIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  color="inherit"
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://twitter.com/yourhandle"
                  target="_blank"
                  color="inherit"
                >
                  <TwitterIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}

export default Contact;
