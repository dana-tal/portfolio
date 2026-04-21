import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Box, Chip,Stack,SvgIcon} from '@mui/material';

const ProjectCard = ({project}) => {

    const CustomGitHubIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </SvgIcon>
);

// Custom External Link Icon (No installation required)
const CustomLaunchIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </SvgIcon>
);

  return (
            <Card 
              sx={{ 
                height: '100%', 
                maxWidth: 360, // Setting a max-width helps the grid calculate the center better
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
                backgroundColor:"#659EC7",
                color:"white"
              }}
            >
             {false && <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />}
              <CardContent sx={{ flexGrow: 1 ,textAlign: 'center'}}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="medium">
                  {project.title}
                </Typography>
                { false && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {project.short_desc}
                </Typography> }
                {false && <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {project.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                  ))}
                </Stack>}
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', px: 2, pb: 2 }}>
                <Button 
                  size="small" 
                   variant="contained" 
                  startIcon={<CustomGitHubIcon sx={{ color: 'white' }}/>} 
                  href={project.github_link}
                  target="_blank"
                  sx={{ color: 'white' }}
                >
                  GitHub
                </Button>
                <Button 
                  size="small" 
                  variant="contained" 
                  endIcon={<CustomLaunchIcon />} 
                  href={project.demo_link}
                  target="_blank"
                >
                  Live Demo
                </Button>
              </CardActions>
            </Card>
          
  )
}

export default ProjectCard