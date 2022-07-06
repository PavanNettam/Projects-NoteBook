import { useProjectsContext } from "../hooks/useProjectsContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ProjectDetails = ({project}) => {
    const { dispatch } = useProjectsContext()
    const handelDelete = async () => {
        const response = await fetch('/api/projects/'+project._id, {method: 'DELETE'});

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_PROJECT', payload: json});
        }
    }
    return ( 
        
        <div className="project-details">
            <a href={project.link}><h4>{project.title}</h4></a>
            <p>{project.desc}</p>
            <p><strong>Team Size: </strong>{project.teamSize}</p>
            <p>{formatDistanceToNow(new Date(project.createdAt),{addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handelDelete}>delete</span>
        </div>
     );
}
 
export default ProjectDetails;