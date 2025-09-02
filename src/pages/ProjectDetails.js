import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Container, Chip, Grid, Divider } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    axios
      .get(`${apiBaseUrl}/api/projects/${id}/`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load project details.");
      });
  }, [id]);

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (error) return <Typography color="error" sx={{ p: 3 }}>{error}</Typography>;
  if (!project) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <>
      <Navbar handleScroll={handleScroll} />

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
          {project.title}
        </Typography>

        {/* Video Section */}
        {project.video && (
          <Box sx={{ mb: 4 }}>
            <video width="100%" controls>
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        {/* Full Description */}
        <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
          {project.full_description || project.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
          {project.tags?.split(",").map((tag, idx) => (
            <Chip key={idx} label={tag.trim()} color="primary" />
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Screenshots */}
        {project.screenshots?.length > 0 && (
          <Grid container spacing={2}>
            {project.screenshots.map((shot, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx} width={1000}>
                <img
                  src={shot.image}
                  alt={`Screenshot ${idx + 1} for ${project.title}`}
                  style={{ width: "100%", borderRadius: 8 }}
                />
                {shot.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {shot.description}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default ProjectDetails;
