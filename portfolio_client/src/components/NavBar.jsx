import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import ProjectsMenu from './ProjectsMenu';

import {  Menu, MenuItem } from "@mui/material";

import { useQuery } from '@tanstack/react-query';
import { requestAllProjects } from '../utils/projectRequests';


function NavBar({ links }) {

   const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: requestAllProjects
  });



 const projects = data?.data?.projectData ?? [];
 
   console.log("In Navbar");
   console.log(projects);

   return (
    <Box className="navbar-container">
      <Stack className="navbar-stack" direction="row"  gap={2}>
        { links.map( link =>{ 
             
             if ( link.link)
             {
                return <Button key={link.name} variant="contained" className="navbar-button" component={NavLink} to={link.link} end >{link.name}</Button> 
             }
             else if (link.callback)
             {
                return <Button key={link.name} variant="contained" className="navbar-button" onClick={link.callback} >{link.name}</Button>
             }
        })
        }
        <ProjectsMenu  projects={projects}/>
      </Stack>
    </Box>
  );

}

export default NavBar