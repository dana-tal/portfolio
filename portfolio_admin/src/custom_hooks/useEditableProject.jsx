import { useState } from "react";
import { requestAllProjects, requestProjectAdd, requestProjectUpdate, requestRemoveProjects } from "../utils/projectRequests";

export const useEditableProject = () => { 

        const [rows, setRows] = useState([]);
        const [loadingProjects, setLoadingProjects] = useState(false);          
        const [ projectId, setProjectId ] = useState(""); // the product to be editted 
        const [isLightboxOpen, setIsLightBoxOpen] = useState(false);
        const [feedbackMsg, setFeedbackMsg] = useState("");
        const [errorMsg, setErrorMsg] = useState("");


         const showFeedback = (msg)=>{
             setFeedbackMsg(msg);
              setTimeout(() => {
                    setFeedbackMsg("");
                    }, 4000);
     }

     const showErrorMsg =  (msg)=>{
        setErrorMsg(msg);
         setTimeout(() => {
                    setErrorMsg("");
                    }, 4000);
     }
    

     
      const handleRemoveProjects = async (ids) =>{

        if (!ids || ids.length===0)
        {
            showErrorMsg("No projects were selected for removal, please select some.");
            return;
        }
        const response = await requestRemoveProjects(ids);
        if (response.ok)
        {
            setRows( (prevRows)=> {  
                       let temp = [ ...prevRows];
                       const updatedRows  =  temp.filter( project=> { return !ids.includes(project.id) } )
                       return updatedRows;
             })
              showFeedback("Project(s) removed successfully");     
        }
      }


      const fetchAllProjects = async () =>{

          setLoadingProjects(true);
          const response = await requestAllProjects();
          if (response.ok)
          {
              console.log("projects");
              console.log(response.data.projectData);
              setRows(response.data.projectData);
          }           
          setLoadingProjects(false);
      }

      const handleProjectEdit =(projectId) =>{
             setProjectId(projectId);
             setIsLightBoxOpen(true);
    }

      const handleProjectAdd = async (projectObj, setError)=>{
                      
          const response = await requestProjectAdd(projectObj);
          if (response.ok)
          {
              const project = response.data.projectData ;
              setRows( (prevRows)=>{  return [ project,...prevRows] } );
              setIsLightBoxOpen(false);
              showFeedback("Project added successfully");             
          }
          else
          {
               setError("root", { type: "server", message: response.message || "Adding failed" });
          }
         
      }

       const handleProjectUpdate = async (projectObj, setError)=>
      {

        const response = await requestProjectUpdate(projectObj);
        if (response.ok)
        {
            const updatedProject = response.data.projectData ;
            setRows( (prevRows)=>{  
                let temp = [...prevRows]; 
                let updated = temp.map( (project)=>{ if (project.id=== updatedProject.id){ return updatedProject } else { return project }  } );
                return updated;
            });
            setIsLightBoxOpen(false);  
            showFeedback("Project updated successfully");                 
        }
        else
        {
            setError("root", { type: "server", message: response.message || "Update failed" }); 
        }
    }

      const renderProjectName = (params)=>{
             return <span onClick={ ()=>{  handleProjectEdit( params.row.id );  }} style={{ color:"blue", textDecoration:"underline" ,cursor: "pointer"}}>
                {params.row.title}
                </span>
    }


     return {rows,loadingProjects,fetchAllProjects,projectId,setProjectId,isLightboxOpen,setIsLightBoxOpen,
        handleProjectAdd, handleProjectUpdate,handleRemoveProjects,renderProjectName,feedbackMsg,errorMsg};

}