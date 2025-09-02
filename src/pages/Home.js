import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { motion } from "framer-motion";
import { Box, Typography, Grid, Link, Skeleton, Alert } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000";

function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Home | Portfolio";
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`${apiBaseUrl}/api/projects/`)
      .then((res) => setProjects(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleScroll = (event, id) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div>
      <>
        <Navbar handleScroll={handleScroll} />

        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* Left vertical social icons */}
          <Box
            sx={{
              position: "sticky",
              top: "40vh",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 3,
              px: 2,
              borderRight: "1px solid #ddd",
              height: "fit-content",
              alignSelf: "center",
            }}
          >
            <Link
              href="https://github.com/PGpjozz"
              target="_blank"
              color="inherit"
              aria-label="GitHub profile"
            >
              <GitHubIcon fontSize="large" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" color="inherit" aria-label="LinkedIn profile">
              <LinkedInIcon fontSize="large" />
            </Link>
            <Link href="https://twitter.com/" target="_blank" color="inherit" aria-label="Twitter profile">
              <TwitterIcon fontSize="large" />
            </Link>
          </Box>

          {/* Main content */}
          <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
            {/* Developer Summary */}
            <Box
              id="summary"
              sx={{
                maxWidth: 800,
                mx: "auto",
                mb: 6,
                textAlign: "center",
                scrollMarginTop: "80px",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: { sm: "2.125rem" } }}>
                Hi, I’m Miyelani —
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                I am a versatile and results-driven Developer with expertise in
                Web, Software, and Mobile Application Development. I have
                hands-on experience with modern programming languages and
                frameworks, including JavaScript, React, Django, Python, .NET
                (C#), PHP, and Java. My backend proficiency spans MySQL,
                PostgreSQL, MongoDB, and SQL-based systems, allowing me to build
                scalable, secure, and efficient applications. In addition to
                development, I have strong experience with Power BI, Microsoft
                Power Automate, and Microsoft Dynamics 365 CRM, enabling
                intelligent business solutions and workflow automation. I’m also
                certified in CCNA and skilled in cloud technologies like
                Microsoft Azure.
              </Typography>
            </Box>

            {/* Projects Section */}
            <Box id="projects" sx={{ scrollMarginTop: "80px", pb: 4 }}>
              <Box
                sx={{
                  position: "sticky",
                  top: 50,
                  zIndex: 10,
                  backgroundColor: "#fff",
                  py: 2,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                }}
              >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  <FolderIcon
                    fontSize="large"
                    sx={{ verticalAlign: "middle", mr: 1 }}
                  />
                  My Projects
                </Typography>
              </Box>
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {loading ? (
                <Grid container spacing={4} sx={{ mt: 1 }}>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
                      <Skeleton height={32} sx={{ mt: 1, width: "80%" }} />
                      <Skeleton height={20} sx={{ width: "60%" }} />
                    </Grid>
                  ))}
                </Grid>
              ) : projects.length === 0 ? (
                <Typography sx={{ mt: 3 }} color="text.secondary">
                  No projects to display yet. Please check back soon.
                </Typography>
              ) : (
              <Grid container spacing={4} sx={{ mt: 1 }}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id || index}>
                    <ProjectCard project={project} index={index} />
                  </Grid>
                ))}
              </Grid>
              )}
            </Box>
          </Box>
        </Box>

        <Footer />
      </>
    </motion.div>
  );
}

export default Home;


                development, I have strong experience with Power BI, Microsoft

                Power Automate, and Microsoft Dynamics 365 CRM, enabling

                intelligent business solutions and workflow automation. I’m also

                certified in CCNA and skilled in cloud technologies like

                Microsoft Azure.

              </Typography>

            </Box>



            {/* Projects Section */}

            <Box id="projects" sx={{ scrollMarginTop: "80px", pb: 4 }}>

              <Box

                sx={{

                  position: "sticky",

                  top: 50,

                  zIndex: 10,

                  backgroundColor: "#fff",

                  py: 2,

                  boxShadow: "0 2px 4px rgba(0,0,0,0.06)",

                }}

              >

                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>

                  <FolderIcon

                    fontSize="large"

                    sx={{ verticalAlign: "middle", mr: 1 }}

                  />

                  My Projects

                </Typography>

              </Box>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {loading ? (
                <Grid container spacing={4} sx={{ mt: 1 }}>
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 2 }} />
                      <Skeleton height={32} sx={{ mt: 1, width: "80%" }} />
                      <Skeleton height={20} sx={{ width: "60%" }} />
                    </Grid>
                  ))}
                </Grid>
              ) : projects.length === 0 ? (
                <Typography sx={{ mt: 3 }} color="text.secondary">
                  No projects to display yet. Please check back soon.
                </Typography>
              ) : (
              <Grid container spacing={4} sx={{ mt: 1 }}>

                {projects.map((project, index) => (

                    <Grid item xs={12} sm={6} md={4} key={project.id || index}>
                    <ProjectCard project={project} index={index} />

                  </Grid>

                ))}

              </Grid>

              )}
            </Box>

          </Box>

        </Box>



        <Footer />

      </>

    </motion.div>

  );

}



export default Home;


