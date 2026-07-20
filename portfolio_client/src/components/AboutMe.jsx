
import { Box, Typography, Container, Paper } from "@mui/material";
import ProjectCard from "./ProjectCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useQuery } from '@tanstack/react-query';
import { requestAllProjects } from '../utils/projectRequests';
import { useNavigate } from "react-router-dom";

const  AboutMe =() => {

  const navigate = useNavigate();

   const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: requestAllProjects
  });

 
  const projects = data?.data.projectData || [];
  const featuredProjects = projects.slice(0, 2) || [];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box sx={{ position: "relative" }}>
          {/* Profile Image - top right with text wrapping */}
          <Box
            sx={{
              float: { xs: "none", md: "right" },
              width: { xs: 140, md: 180 },
              height: { xs: 140, md: 180 },
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: "#e0e0e0",
              marginLeft: { xs: 0, md: 3 },
              marginBottom: 2,
            }}
          >
            <img
              src="/dana_blue2.png"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="eager"
            />
          </Box>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Full-Stack Developer
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
            I’m an experienced Full-Stack Developer with a strong background in building, maintaining, and improving web applications.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
            Over the years, I’ve worked across both frontend and backend, using technologies like Node.js, PHP, SQL, JavaScript, and React. I’ve built dynamic, responsive websites, developed internal tools, and integrated third-party services into existing systems.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>  
            I also have experience incorporating AI capabilities into applications, working with Large Language Models (LLMs), OpenAI APIs, LangChain, and LangGraph to build AI-powered workflows and enhance application functionality. In addition, I use AI-assisted coding tools such as GitHub Copilot to improve development efficiency and productivity.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
            My experience spans both legacy and modern technologies, which gives me a practical understanding of how systems evolve over time. I’m comfortable working with existing codebases, understanding their structure, and improving them in a way that keeps them stable while moving them forward.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
            I focus on writing clear, maintainable code and building applications that are efficient, scalable, and easy to use. Structure and simplicity are important to me — I prefer solutions that are straightforward, readable, and easy to extend.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb: 2 }}>
            I enjoy solving problems, whether it’s implementing new features, debugging complex issues, or refining existing functionality. I tend to approach challenges by breaking them down, understanding the system, and finding practical, reliable solutions.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "justify", mb:2 }}>
            In addition to building from scratch, I have experience working on ongoing systems — maintaining, improving, and adapting them as requirements change. This includes thinking about performance, usability, and how different parts of the application interact.
          </Typography>

          <Typography variant="body1" sx={{ textAlign: "left" }}>
              Feel free to connect with me on LinkedIn:&nbsp;
              <a
                href="https://www.linkedin.com/in/dana-tal-full-stack-developer/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dana Tal
              </a>
            </Typography>

            <Box sx={{ display: "flex", mt: 2 }}>
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate("/projects")}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              View All Projects
            </Button>
          </Box>

           { !isLoading && <Grid container spacing={2} sx={{ mt:2}}>
            {featuredProjects.map((project) => (
              <Grid xs={12} sm={6} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>}

        </Box>
      </Paper>
    </Container>
  );
}


export default AboutMe