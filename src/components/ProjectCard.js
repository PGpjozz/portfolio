import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

const ProjectCard = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 2, y: -1 }}
    transition={{ delay: index * 0.3, duration: 0.5 }}
    style={{ height: "100%" }}
  >
    <Card
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-9px)",
          boxShadow: 10,
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ height: 190, overflow: "hidden", flexShrink: 0 }}>
        {project.image && (
          <CardMedia
            component="img"
            image={project.image}
            alt={project.title}
            sx={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "text.secondary", flexGrow: 1 }}
        >
          {project.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {project.tags?.split(",").map((tag, idx) => (
            <Chip key={idx} label={tag.trim()} size="small" color="primary" />
          ))}
        </Box>
      </CardContent>

      {/* Action Button */}
      <CardActions sx={{ mt: "auto", minHeight: 52 }}>
        {project.url ? (
          <Button
            size="small"
            component={RouterLink}
            to={`/projects/${project.id}`}
            sx={{ ml: 1 }}
          >
            View Project
          </Button>
        ) : (
          <Box sx={{ height: 36, ml: 1 }} /> // Keeps space consistent
        )}
      </CardActions>
    </Card>
  </motion.div>
);

export default ProjectCard;
