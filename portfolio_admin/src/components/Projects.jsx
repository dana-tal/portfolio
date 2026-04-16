import { useEffect,useRef} from "react";
import  { useEditableProject}  from '../custom_hooks/useEditableProject';
import StyledTable from "./StyledTable";
import {Box, Alert} from "@mui/material";
import ProjectForm from "./ProjectForm";
import LightBox from "./LightBox";
import CustomButton from "./CustomButton";
import "./SiteTemplate.css";

 const Projects= () => {


    const { rows, loadingProjects, fetchAllProjects,projectId,setProjectId,isLightboxOpen,setIsLightBoxOpen,
      handleProjectAdd, handleProjectUpdate,handleRemoveProjects,renderProjectName,feedbackMsg,errorMsg } = useEditableProject();
    const tableRef = useRef();
    const paginationModel = { page: 0, pageSize: 10 };
    
    const handleClick = () => {
     if (tableRef.current) 
      {
        const selectedIDs = tableRef.current.getSelectedIds(); 
        if (!selectedIDs || !selectedIDs.ids )
        {
            handleRemoveProjects([]);
        }
        else 
        {
            handleRemoveProjects(Array.from(selectedIDs.ids));      
        }
    }
  };


  const columns = [
    {
       field:'title',
       headerName:'Project Name',
       flex:1,
       sortable:true,
       valueGetter: (value,row)=>`${row.title}`,
       align:'left',
       type:'string',     
       renderCell: renderProjectName   
    },
    {
      field:'demo_link',
      headerName:'Live Demo',
      flex:1,
      sortable:false,
       align:'left',
       type:'string', 
       renderCell: (params)=>{ return <a href={params.row.demo_link} target='_blank' rel="noopener noreferrer">{params.row.title}</a>}  
    }

  ];


   useEffect( ()=>{
        fetchAllProjects();
       console.log("inside useEffect")
   },[]);
  

  return (
    


      <div className="site-container">  
                     <Box
                width={{ xs: "90%", sm: "70%", md: "70%", lg: "70%" }}
                mx="auto"
                mt={5}
                p={3}
                boxShadow={0}
                borderRadius={2}
              >
                {feedbackMsg && <Alert severity="success">{feedbackMsg}</Alert>}
                {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                <StyledTable rows={rows} columns={columns} paginationModel={paginationModel} pageSizes={[5,10,20,30]} title="Projects" loading={loadingProjects} includeCheckboxes={true} ref={tableRef} />   

                  <div style={{ display:"flex" ,flexDirection:"row", justifyContent:"center"}}>
                        <CustomButton clickHandler={ () => { setIsLightBoxOpen(true);   setProjectId(""); }} bgColor="#1974D2"  textColor="white" label="Add New Project"/>
                    
                        <CustomButton clickHandler={handleClick} bgColor="#CB6D51" textColor="white" label="Remove Projects"/>
                  </div>

                <LightBox  key={projectId || "new"}         isOpen={isLightboxOpen} onCloseCallback={() => setIsLightBoxOpen(false)} backdropColor="rgba(14, 135, 204, 0.3)">
                            <ProjectForm   onAddProject={handleProjectAdd} onUpdateProject={handleProjectUpdate} projectId={projectId} />
                  </LightBox>
              </Box>
                
       
    </div>
  )
}

export default Projects