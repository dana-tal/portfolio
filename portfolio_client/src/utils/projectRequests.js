import axios from "axios";
import { analize_error,DOMAIN  } from "./generalFuncs";


const requestAllProjects = async ()=> {

    try
    {
        const response = await axios.get (DOMAIN +'/project/public',{ withCredentials: true })
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




export {
    requestAllProjects,
    requestProjectById,
}