import React from "react";
import { Box, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: "#f4f4f4",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} PG. Built with ❤️ using React & Material
        UI.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link href="mailto:miyelaniclimate@gmail.com">
          miyelaniclimate@gmail.com
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
