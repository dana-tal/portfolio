import SiteTemplate from "./components/SiteTemplate";
import {Routes, Route} from 'react-router-dom';
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import ProjectPage from "./components/ProjectPage";
import { requestAllProjects } from "./utils/projectRequests";

import { useEffect } from "react";

function App() {

  useEffect( ()=>{
    
    const fetchAllProjects = async ()=>
    {
        const response = await requestAllProjects();
        console.log("projects");
        console.log(response.data.projectData);
    }

    fetchAllProjects();

  },[]);

  return (
    <>
      <Routes>
        <Route path="/"  element={ <SiteTemplate />} >
                  <Route path="aboutMe" element={<AboutMe/>} />
                  <Route path="projects" element={<Projects/>} />
                  <Route path="project/:id" element={<ProjectPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
