import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { requestProjectById } from "../utils/projectRequests";

function ProjectPage() {

   // const paramsObj = useParams();
  const { id } = useParams();
  const queryClient = useQueryClient();
    const { data:project , isLoading, error } = useQuery({
    queryKey: ['project', id],
    queryFn: () => requestProjectById(id),
    initialData: () => {
        const cached = queryClient.getQueryData(['projects']);
        const projects = cached?.data?.projectData;
        return projects?.find(p => p.id?.toString() === id);
    },
    select: (rawData) => {
                            const cleanData = rawData?.data?.projectData || rawData?.data || rawData;
                                  return cleanData;
                        }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

 
  
 // const project = data?.data?.projectData || data?.data || data;

  if (!project) return <div>Project not found</div>;

  console.log("single project:");
  //console.log(data);
  console.log(project);
  console.log(project?.title);


  return (
      <div>
        Single Project
         <h3>{project?.title}</h3>
          <span>{project?.id}</span>
    </div>
  )
}

export default ProjectPage