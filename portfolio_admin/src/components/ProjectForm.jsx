import { useForm, Controller } from "react-hook-form";
import {Button,TextField,Alert,Stack, Typography,Paper,Select,
    MenuItem,FormControl,FormHelperText} from "@mui/material";
import { useEffect, useState} from "react";
import { requestProjectById } from "../utils/projectRequests";
 
const ProjectForm = ({ onAddProject , onUpdateProject, projectId="" }) =>{

    const projectForm = useForm({ defaultValues: { id:"",title: "",demo_link:"",github_link:"",technologies:"",description:"",sortOrder:0 }, });
    const { handleSubmit,control,formState: { errors },reset, setError}  = projectForm;  

    const [selectedProject, setSelectedProject] = useState(null); // selectedProject will be an object containing the project to be updated
  
    const titleRegex = /^[\p{L}\d\s.,!?'"-]+$/u; 
    const forbiddenChars = /[<>{}\[\]]/; // Forbidden characters: < > { } [ ]
    const scriptPattern = /(script|onerror|onload|javascript:)/i; // Script-like patterns
   
   useEffect(() => {
    if (selectedProject) {
        reset({
                    id: selectedProject.id,
                    title: selectedProject.title,
                    demo_link: selectedProject.demo_link,
                    github_link: selectedProject.github_link,
                    technologies: selectedProject.technologies,
                    description: selectedProject.description,
                    sortOrder: selectedProject.sortOrder
        });
    }
}, [selectedProject, reset]);

   useEffect( ()=>{
      const fetchProject = async (id)=>{
            const response = await requestProjectById(id);

            console.log("response=");
            console.log(response);

            if (response.ok)
            {
                 setSelectedProject(response.data.projectData);
            }
      } 
      
      if (projectId)
      {
        fetchProject(projectId);
      }
      else
      {
         setSelectedProject(null);
      }

   },[projectId]);


    const onSubmit = async (data) => 
    {
        let ok;

         if (projectId)
         {
               ok = await onUpdateProject(data, setError);
         }
         else
         {
                ok = await onAddProject(data, setError);
         }
        if (ok) 
        {
            reset();
        }
    };


  
     return (
    <>
       <Paper
        elevation={0}
         sx={{
                p: 0,
                m: "auto",
                width: "100%",             // take full width of parent
                maxWidth: 1200,            // limit max width
                boxSizing: "border-box",
            }}
        >
         
   

        {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)} style={{ border:"2px solid #C19A6B",borderRadius:"10PX",padding:"10px",width:"98%", margin:"auto"}}>
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
               { projectId ? 'Edit a Project': 'Add a New Project'}
            </Typography>

            <Stack spacing={2}>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                    <Typography sx={{ width: { sm:80} }}>Title:</Typography>
                    <Controller
                    name="title"
                    control={control}
                      rules={{ 
                        required: "Project title is missing or has invalid type." ,
                        minLength: { value: 2, message: "Title must be at least 2 characters" },
                        maxLength: { value: 80, message: "Title cannot exceed 80 characters" },    
                        pattern: { value: titleRegex, message: "Title contains invalid characters." },
                     }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        size="small"                        
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        placeholder="Project Title"
                         sx={{ width: "100%" }}                      
                        />
                    )}
                    />
                </Stack>
               
                 <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                    <Typography sx={{ width: 80 }}>Demo Link:</Typography>
                    <Controller
                    name="demo_link"
                    control={control}
                    rules={{
                                required: "Demo link is required",
                                validate: (value) => {
                                    try {
                                            const url = new URL(value);
                                            return true;
                                    } catch {
                                    return "Invalid URL";
                                    }
                                }
                            }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        size="small"                        
                        error={!!errors.demo_link}
                        helperText={errors.demo_link?.message}
                        placeholder="Project Demo Link"
                        sx={{ width: "100%" }}             
                        />
                    )}
                    />
                </Stack>

                 <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                    <Typography sx={{ width: 80 }}>Github Link:</Typography>
                    <Controller
                    name="github_link"
                    control={control}
                    rules={{
                                required: "Github link is required",
                                validate: (value) => {
                                    try {
                                            const url = new URL(value);
                                            return true;
                                    } catch {
                                    return "Invalid URL";
                                    }
                                }
                            }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        size="small"                        
                        error={!!errors.github_link}
                        helperText={errors.github_link?.message}
                        placeholder="Project Github link"
                        sx={{ width: "100%" }}             
                        />
                    )}
                    />
                </Stack>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                <Typography sx={{ width: 80 }}>Tech Stack:</Typography>
                <Controller
                name="technologies"
                control={control}
                 rules={{ 
                        required: "Project technologies is missing." ,
                        minLength: { value: 5, message: "Technologies must be at least 5 characters" },
                        maxLength: { value: 10000, message: "Technologies cannot exceed 1000 characters" },    
                         validate: (value) => {
                                if (forbiddenChars.test(value)) {
                                    return "Technologies contains forbidden characters: < > { } [ ]";
                                }
                                if (scriptPattern.test(value)) {
                                    return "Technologies contains unsafe script-like patterns";
                                }
                                return true; // all good
                        }
                      }}       
                render={({ field }) => (
                    <TextField
                    {...field}
                    size="small"
                    sx={{ width: "100%" }}
                    multiline
                    rows={4}
                    placeholder="Technologies"
                     error={!!errors.technologies}
                     helperText={errors.technologies?.message}
                    />
                )}
                />
                </Stack>    

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                <Typography sx={{ width: 80 }}>Description:</Typography>
                <Controller
                name="description"
                control={control}
                 rules={{ 
                        required: "Project description is missing." ,
                        minLength: { value: 5, message: "Description must be at least 5 characters" },
                        maxLength: { value: 10000, message: "Description cannot exceed 10000 characters" },    
                         validate: (value) => {
                                if (forbiddenChars.test(value)) {
                                    return "Description contains forbidden characters: < > { } [ ]";
                                }
                                if (scriptPattern.test(value)) {
                                    return "Description contains unsafe script-like patterns";
                                }
                                return true; // all good
                        }
                      }}       
                render={({ field }) => (
                    <TextField
                    {...field}
                    size="small"
                    sx={{ width: "100%" }}
                    multiline
                    rows={4}
                    placeholder="Description"
                     error={!!errors.description}
                     helperText={errors.description?.message}
                    />
                )}
                />
                </Stack>

                 <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "flex-start", sm: "center" }} sx={{ width: "100%" }}>
                    <Typography sx={{ width:80 }}>sortOrder:</Typography>
                    <Controller
                    name="sortOrder"
                    control={control}
                    rules={{ required: "sortOrder is required", min: { value: 0.1, message: "sortOrder must be > 0" } }}
                    render={({ field }) => (
                        <TextField
                        {...field}
                        type="number"
                        size="small"
                        error={!!errors.sortOrder}
                        helperText={errors.sortOrder?.message}
                        placeholder="Enter sortOrder"
                        sx={{ width: "50%" }}
                        />
                    )}
                    />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <Controller
                        name="id"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input type="hidden" {...field} />
                        )}
                        />
                </Stack>


                <Button type="submit" variant="contained" sx={{ alignSelf: "flex-start", mt: 1 , textTransform:"capitalize"}}>
                   {selectedProject ? 'Update Project':'Add Project'}
                </Button>
            </Stack>
        </form>
       </Paper>
    </>
     );
}

export default ProjectForm 