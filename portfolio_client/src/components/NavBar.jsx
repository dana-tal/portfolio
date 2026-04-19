import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import ProjectsMenu from './ProjectsMenu';

import {  Menu, MenuItem } from "@mui/material";

function NavBar({ links }) {
   return (
    <Box className="navbar-container">
      <Stack className="navbar-stack" direction="row" flexWrap="wrap" gap={2}>
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
        <ProjectsMenu  projects={[{id:1, title:'Project A'},{id:2, title:'Project B'}, {id:3, title:'Project C'} ]}/>
      </Stack>
    </Box>
  );

}

export default NavBar