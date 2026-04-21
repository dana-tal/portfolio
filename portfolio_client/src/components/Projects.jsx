import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { requestAllProjects } from '../utils/projectRequests';
import ProjectCard from "./ProjectCard";
import { Container, Typography, Grid, Box,Stack} from '@mui/material';

function Projects() {

   const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: requestAllProjects
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;

  const projects = data?.data.projectData;

  console.log("projects!")
  console.log(projects);

  return (
   <>
     <Box 
      sx={{ 
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        pt: 8,
        pb: 4,
        overflowX: 'hidden', // Prevents horizontal scroll from Grid margins
        
      }}
    >
      <Container maxWidth="lg" sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' // Explicitly center children of the container
        }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Selected Projects
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Full-stack applications and technical solutions.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center" sx={{ 
            width: '100%', 
            margin: '0 auto' // Forces the grid itself to stay centered
          }} >
            {projects?.map(p => (
              <Grid item key={p.id || p._id} xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
               <ProjectCard project={p} />
              </Grid>
        ))}
      </Grid>
      </Container>
    </Box>
   </>
  )
}

export default Projects