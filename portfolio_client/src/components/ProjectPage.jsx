import { useParams } from "react-router-dom";

function ProjectPage() {

    const paramsObj = useParams();

  return (
    <div>Project Id : {paramsObj.id} </div>
  )
}

export default ProjectPage