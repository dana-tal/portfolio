import { Box, Typography, Stack, Button, Chip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function ProjectHeader({ project }) {
  return (
    <Box sx={{ mb: 3 }}>
      
      {/* Title */}
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
        gutterBottom
      >
        {project.title}
      </Typography>

      {/* Buttons */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        {project.github_link && (
          <Button
            fullWidth={{ xs: true, sm: false }}
            variant="outlined"
            startIcon={<GitHubIcon />}
            href={project.github_link}
            target="_blank"
          >
            GitHub
          </Button>
        )}

        {project.demo_link && (
          <Button
            fullWidth={{ xs: true, sm: false }}
            variant="contained"
            endIcon={<OpenInNewIcon />}
            href={project.demo_link}
            target="_blank"
          >
            Live Demo
          </Button>
        )}


          {project.video_link && (
          <Button
            fullWidth={{ xs: true, sm: false }}
            variant="contained"
            endIcon={<OpenInNewIcon />}
            href={project.video_link}
            target="_blank"
          >
            Watch a Video 
          </Button>
        )}


         {project.additional_link && (
          <Button
            fullWidth={{ xs: true, sm: false }}
            variant="contained"
            endIcon={<OpenInNewIcon />}
            href={project.additional_link}
            target="_blank"
          >
           Additional Link
          </Button>
        )}
      </Stack>

      

      {/* Tags */}
      {project.tags?.length > 0 && (
        <Stack direction="row" spacing={1} >
          {project.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      )}

    </Box>
  );
}