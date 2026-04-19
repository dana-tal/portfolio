import { Link } from "react-router-dom";

function Projects() {
  return (
    <div>Projects:
      <nav style={{ display:"flex", justifyContent:"space-around", border:"1px solid black", height:"50px", backgroundColor:"tan", alignItems:"center"}}>
          <Link to="/project/1" > Project 1</Link>
          <Link to="/project/2" > Project 2</Link>
          <Link to="/project/3" > Project 3</Link>
     </nav>

    </div>
  )
}

export default Projects