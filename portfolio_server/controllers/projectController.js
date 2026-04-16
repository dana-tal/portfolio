const projectService = require('../services/projectServices');

const addProject = async (req,res) =>
{
    try
    {
        const projectObj = req.body;
        const newProject = await projectService.addProject(projectObj);
        return res.status(201).json({ ok:true, projectData: newProject, message: "Project added successfully" });
    }
    catch(err)
    {
        return res.status(500).json({
                ok: false,
                message: err.message                 
            });    
    }
}

const updateProject = async (req,res) =>
{
    try
    {
        const id = req.params.id;        
        const projectObj = req.body;

        const updatedProject= await projectService.updateProject(id,projectObj);
        return res.status(200).json({ok:true, projectData:updatedProject, message:'Project updated successfully'});
    }
    catch(err)
    {
         return res.status(500).json({
                ok: false,
                message: err.message                 
            });    
    }
}

const removeProject = async (req,res) =>
{
    try
    {
        const id = req.params.id;
        const exists = await projectService.projectExists(id);
        if (!exists)
        {
            return res.status(404).json(`Project with id ${id} does not exist`);
        }
        const removedProject = await projectService.removeProject(id);
        return res.status(200).json({ ok:true, projectData:removedProject, message:'Project removed successfully'});
    }
    catch(err)
    {
         return res.status(500).json({
                ok: false,
                message: err.message                 
            });    
    }
}

const removeProjects = async (req,res) => 
{
    try
    {
        const ids = req.body.ids;
        const info = await projectService.removeProjects(ids);   
        return res.status(200).json({ ok:true, projectData: info, message:'Projects removed successfully '});
    }
    catch(err)
    {
        return res.status(500).json({
                ok: false,
                message: err.message                 
            });   
    }
}

const getProjectById = async (req,res) =>
{
    try
    {
        // const result = genValidator.validateMongoId('id',req.params.id);
        //if (result)
        //{
          //  return res.status(result.status).json({ok:false,prudcutData:null,message:result.message});
        //}
        const id = req.params.id;
        const project = await projectService.getProjectById(id);
        if (!project) 
        {
            return res.status(404).json({ok:false,projectData:null,message: `The project ${id} does not exist` });
        }
        
        return res.status(200).json({ok:true,projectData:project,message:'Project info returned successfully'});  
    }
    catch(err)
    {
         return res.status(500).json({
                ok: false,
                message: err.message                 
            });     
    }
}


const getAllProjects = async (req,res) =>
{
    try
    {    
        const allProjects = await projectService.getAllProjects();
        return res.status(200).json({ ok:true, projectData:allProjects,message:"All projects returned successfully"});
    }
    catch(err)
    {
         return res.status(500).json({
                ok: false,
                message: err.message                 
            });    
    }
}


module.exports ={
  addProject,
  updateProject,
  removeProject,
  removeProjects,
  getProjectById,
  getAllProjects
}
