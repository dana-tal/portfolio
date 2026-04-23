const Project = require('../models/projectModel');


const addProject = (projectObj)=>{
       const project = new Project(projectObj);
       return project.save();
}

const getAllProjects = (filters = {}) =>{
    return Project.find(filters).sort({ sortOrder: 1 });
}

const getPublicProjects = (filters = {}) => {
    return Project.find({ ...filters, showProject: true })
        .sort({ sortOrder: 1 });
};

const getProjectById = (id) => {
    return Project.findById(id);
}

// Update project by ID
const updateProject = (id, updateObj) => {
    return Project.findByIdAndUpdate(
        id,
        updateObj,
        { new: true, runValidators: true } // returns updated doc + validates
    );
}

// Delete project by ID
const removeProject = (id) => {
    return Project.findByIdAndDelete(id);
}


const removeProjects = (projectIds) => {
    return Project.deleteMany( { _id: { $in: projectIds } })
}


const projectExists = (id) =>{
    return Project.exists({ _id: id}); 
}

module.exports = {
    addProject,
    updateProject,
    removeProject,
    removeProjects,
    getProjectById,
    getAllProjects,
    getPublicProjects,
    projectExists
}