import { Outlet } from "react-router-dom";
import "./SiteTemplate.css";
import NavBar from "./NavBar";
import { useMatch, useNavigate } from "react-router-dom";

function SiteTemplate() {


  const links = [ {link:'aboutMe', name:'About Me'},  ]; /* {link:'projects', name:'Projects'} */
   
            
  return (  
    <div className="site-container" >  
       <NavBar links={links} />
       <div className="outlet-style" >
          <Outlet />      
        </div>
    </div>
  )
}

export default SiteTemplate