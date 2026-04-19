import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProjectsMenu = ({ projects }) => 
{
  const [menuOrigin, setMenuOrigin] = useState(null);
  const open = Boolean(menuOrigin);

  return (
    <>
      <Button variant="contained" className="navbar-button" onClick={(e) => setMenuOrigin(e.currentTarget)}>
        Projects
      </Button>

      <Menu
        anchorEl={menuOrigin}
        open={open}
        onClose={() => setMenuOrigin(null)}
       slotProps={{
            paper: {
            sx: {
                backgroundColor: "#1974D2",
                color: "white",
            },
            },
        }}
      >
        <MenuItem
            key="all"
            component={Link}
            to="/projects"
            onClick={() => setMenuOrigin(null)}

            sx={{
                    "&:hover": {
                    backgroundColor: "#14A3C7 !important",
                    },
                }}
          >
            All Projects
          </MenuItem>

        {projects.map((project) => (
          <MenuItem
            key={project.id}
            component={Link}
            to={`/project/${project.id}`}
            onClick={() => setMenuOrigin(null)}

            sx={{
                    "&:hover": {
                    backgroundColor: "#14A3C7 !important",
                    },
                }}
          >
            {project.title}
          </MenuItem>
        ))}
      
      </Menu>
    </>
  );
}

export default ProjectsMenu;