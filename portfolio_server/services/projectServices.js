const projectRepo = require('../repositories/projectRepo');


const addProject = async ( projectObj ) =>
{
    try
    {
        const newProject = await projectRepo.addProject(projectObj);
        return newProject;
    }
    catch (err)
    {
        throw err;
    }
}

const updateProject = async (projectId, projectObj) =>
{
    try
    {
        const updatedProject = await projectRepo.updateProject(projectId,projectObj);
        return updatedProject;
    }
    catch (err)
    {
        throw err;
    }
}

const removeProject = async(projectId) =>
{
    try
    {
        return projectRepo.deleteProject(projectId);
    }
    catch (err)
    {
        throw err;
    }
}

const removeProjects = (ids) =>
{
    return projectRepo.removeProjects(ids);
}


const projectExists = (id)=>{
    return projectRepo.projectExists(id);
}


const getProjectById = async ( projectId ) =>
{
   return projectRepo.getProjectById(projectId);
}

const getAllProjects = async () =>
{
    try
    {
        const allProjects = await projectRepo.getAllProjects();
        return allProjects;
    }
    catch(err)
    {
        throw err;
    }
}


const getPublicProjects = async () =>
{
    try
    {
        const publicProjects = await projectRepo.getPublicProjects();
        return publicProjects;
    }
    catch(err)
    {
        throw err;
    }
}




module.exports =
{
    addProject,
    updateProject,
    removeProject,
    removeProjects,
    getProjectById,
    getAllProjects,
    getPublicProjects,
    projectExists
}