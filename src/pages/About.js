import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Chip,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Download } from "@mui/icons-material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const skills = [
  "JavaScript",
  "React",
  "Python",
  "Django",
  "MySQL",
  "Framer Motion",
  "Material UI",
  ".NET",
  "C#",
  "PHP",
  "Java",
  "MongoDB",
  "PostgreSQL",
  "Power BI",
  "MS Power Automate",
  "Dynamics 365 CRM",
  "Azure",
];

const About = () => {
  const [cvUrl, setCvUrl] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "About | Portfolio";
    const fetchCV = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/cv/`);
        if (res.data && res.data.file) {
          setCvUrl(`${apiBaseUrl}${res.data.file}`);
        }
      } catch (err) {
        console.error("Error fetching CV:", err);
      }
    };

    const fetchProfilePic = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/profile-picture/`);
        if (res.data && res.data.image) {
          setProfilePicUrl(`${apiBaseUrl}${res.data.image}`);
        }
      } catch (err) {
        console.error("Error fetching profile picture:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
    fetchProfilePic();
  }, []);

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
          py: 6,
          px: 3,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 900, width: "100%" }}
        >
          <Paper elevation={8} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, backdropFilter: "blur(4px)" }}>
            <Stack spacing={4} alignItems="center">
              <Avatar
                src={profilePicUrl || ""}
                alt="Miyelani"
                sx={{ width: 140, height: 140, boxShadow: 3 }}
              />
              <Typography variant="h3" fontWeight="bold" sx={{ textAlign: "center" }}>
                About Me
              </Typography>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    maxWidth: 800,
                    color: "text.secondary",
                    lineHeight: 1.9,
                    whiteSpace: "pre-line",
                  }}
                >
                  {`Hello, I’m Miyelani — a passionate and adaptable Web and Software Developer based in Soweto, South Africa. I specialize in building responsive web applications, scalable backend systems, and intuitive mobile apps that drive results.
                    
                  My technical stack includes JavaScript, React, Python, Django, .NET (C#), PHP, Java, and SQL-based databases like MySQL, PostgreSQL, and MongoDB.

                  Beyond coding, I bring business value through Power BI, Microsoft Power Automate, and Dynamics 365 CRM, with practical knowledge of Azure cloud solutions and CCNA certification.

                  I take pride in crafting clean, maintainable code and dynamic interfaces using frameworks like Material UI and Bootstrap. Whether it’s a business tool or a user-focused app, I aim to build solutions that are efficient, elegant, and impactful.`}
                </Typography>
              </motion.div>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {loading ? (
                  <CircularProgress sx={{ mt: 2 }} />
                ) : cvUrl ? (
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Download />}
                    component="a"
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    sx={{ mt: 2 }}
                  >
                    Download My CV
                  </Button>
                ) : (
                  <Typography color="error" sx={{ mt: 2 }}>CV not available.</Typography>
                )}
              </Box>

              <Typography variant="h5" fontWeight="bold" mt={4}>
                Technologies & Tools I Work With:
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                justifyContent="center"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Chip
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ m: 0.5, px: 1.5, py: 1 }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </motion.div>
      </Box>
      <Footer />
    </>
  );
};
export default About;
