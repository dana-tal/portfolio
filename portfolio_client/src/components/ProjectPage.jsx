import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { requestProjectById } from "../utils/projectRequests";
import ImageCarousel from "./ImageCarousel";
import { getProjectImages } from "../utils/generalFuncs";
import ProjectHeader from "./ProjectHeader";
import ReadMoreText from "./ReadMoreText";

import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
  CircularProgress,
  Divider
} from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

function ProjectPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => requestProjectById(id),
    initialData: () => {
      const cached = queryClient.getQueryData(["projects"]);
      const projects = cached?.data?.projectData;
      return projects?.find((p) => p.id?.toString() === id);
    },
    select: (rawData) => {
      return rawData?.data?.projectData || rawData?.data || rawData;
    }
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography>Error loading project</Typography>;
  if (!project) return <Typography>Project not found</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

       <ProjectHeader project={project} />

                    {/* GALLERY (top visual block) */}
   <Box sx={{ my: 3, display: "flex", justifyContent: "flex-start" }}>
  <Box sx={{ width: "100%" }}>
    <ImageCarousel images={getProjectImages(project.imagesGallery)} />
  </Box>
</Box>

        <Box>
        <Typography variant="h5" fontWeight="bold" sx={{textDecoration:"underline"}} gutterBottom>
          About this project
        </Typography>

         <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            bgcolor: "background.paper",
            boxShadow: 1
          }}
        >
          <ReadMoreText text={project.description} />
        </Box>

        {false && <Box
          sx={{
            mt: 2,
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            bgcolor: "background.paper",
            boxShadow: 1,
            lineHeight: 1.8
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: "pre-line",
              fontSize: { xs: "0.95rem", md: "1rem" }
            }}
          >
            {project.description}
          </Typography> 
        </Box>}
      </Box>

    </Container>
  );
}

export default ProjectPage;