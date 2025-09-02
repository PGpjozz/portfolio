import React, { useEffect } from "react";
import { Box, Typography, Stack, Chip } from "@mui/material";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const skills = [
  "Website Development",
  "Mobile App Development",
  "Desktop App Development",
  "Business Intelligent Systems",
  "Network System",
  "IT consultations",
  "IT Project Management",
  "Database Admistration",
  "Web Design",
  "Information Systems",
  "ecommerce Systems",
];

const Services = () => {
  useEffect(() => {
    document.title = "Services | Portfolio";
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
          py: 0,
          px: 3,
          background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ maxWidth: 900, width: "100%", pt: 6 }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
            Services I Offer
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
            End-to-end solutions tailored to your business needs.
          </Typography>
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
      </Box>
    </>
  );
};

export default Services;
