import axios from "axios";
import { analize_error,DOMAIN  } from "./generalFuncs";


const requestAllProjects = async ()=> {

    try
    {
        const response = await axios.get (DOMAIN +'/project/all',{ withCredentials: true })
        return {
                    ok:true,
                    data: response.data,
                    message:"All projects returned successfully"
                };
    }
    catch(err)
    {
        return analize_error(err);
    }
}

const requestProjectById = async (projectId) => {
      try
      {
             const response = await axios.get (DOMAIN +`/project/${projectId}`,{ withCredentials: true })
            return {
                        ok:true,
                        data: response.data,
                        message:"Project info returned successfully"
                    };
        }
      catch(err)
      {
        console.log("requestProjectById catch");
         return analize_error(err);
      }
}


const requestProjectRemove = async (id) => {

    try
    {
        const response = await axios.delete( DOMAIN+`/project/remove/${projectId}`, {withCredentials:true});
         return {
                        ok:true,
                        data: response.data,
                        message:"Project removed successfully"
                    };

    }
    catch(err)
    {
          return analize_error(err);
    }
}



const requestRemoveProjects = async (ids) =>{
    try
    {
        const response = await axios.delete( DOMAIN+'/project/remove-many', {data: {ids: ids} ,  withCredentials: true});
        return {
                 ok:true,
                 data: response.data,
                 message:"Selected projects removed successfully"
        };
    }
    catch(err)
    {
        return analize_error(err); 
    }
}

const requestProjectAdd = async (project_obj) =>{
    try
    {
        const response = await axios.post( DOMAIN+'/project/add', 
            {
                title: project_obj.title,
                demo_link: project_obj.demo_link,
                github_link: project_obj.github_link,
                short_desc: project_obj.short_desc,
                description: project_obj.description,
                technologies: project_obj.technologies,
                tags: project_obj.tags,
                image: project_obj.image,
                sortOrder: project_obj.sortOrder    
        },  { withCredentials: true } );

        return {
                   ok:true,
                   data: response.data,
                   message:'Project Added successfully'
        };
    }
    catch(err)
    {
        return analize_error(err);
    }
}


const requestProjectUpdate = async (project_obj)=>
{ 
     try
    {
        const response = await axios.put( DOMAIN+'/project/update/'+project_obj.id, 
            {
                title: project_obj.title,
                demo_link: project_obj.demo_link,
                github_link: project_obj.github_link,
                short_desc: project_obj.short_desc,
                description: project_obj.description,
                technologies: project_obj.technologies,
                tags: project_obj.tags,
                image: project_obj.image,
                sortOrder: project_obj.sortOrder                   
        },  { withCredentials: true } );

        return {
                   ok:true,
                   data: response.data,
                   message:'Project Updated successfully'
        };
    }
    catch(err)
    {
        return analize_error(err);
    }
}


export {
    requestAllProjects,
    requestProjectById,
    requestProjectAdd,
    requestProjectUpdate,
    requestProjectRemove,
    requestRemoveProjects
}