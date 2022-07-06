import { useEffect } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";
import ProjectDetails from "../components/ProjectDetails";
import ProjectForm from "../components/ProjectForm";

const Home = () => {

    const { projects, dispatch } = useProjectsContext();

    useEffect(()=>{
        const fetchProjects = async ()=>{
            const response = await fetch('/api/projects');
            const json = await response.json();

            if(response.ok){
                dispatch({type: 'SET_PROJECTS', payload: json})
            }
        }
        fetchProjects();
    },[dispatch])

    return ( 
        <div className="home">
            <div className="projects">
                {projects && projects.map((project) => {
                    return <ProjectDetails key={project._id} project={project}></ProjectDetails>
                })}
            </div>
            <ProjectForm/>
        </div> 
    );
}
 
export default Home;