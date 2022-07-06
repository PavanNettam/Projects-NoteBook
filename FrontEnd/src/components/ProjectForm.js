import { useState } from "react";
import { useProjectsContext } from "../hooks/useProjectsContext";

const ProjectForm = () => {

    const { dispatch } = useProjectsContext()

    const [title, setTitle] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [link, setLink] = useState('');
    const [desc, setDesc] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handelSubmit = async (e)=>{
        e.preventDefault();

        const project = {title,teamSize,link,desc};

        const response = await fetch('/api/projects',{
            method : 'POST',
            body: JSON.stringify(project),
            headers:{
                'content-type':'application/json'
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.err);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setTitle('');
            setDesc('');
            setLink('');
            setTeamSize('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_PROJECT', payload: json});
        }
    }

    return ( 
        <form className="create" onSubmit={handelSubmit}>
            <h3>Add a New Project</h3>

            <label>Project Title</label>
            <input type="text"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
            className= {emptyFields.includes('title')?'error':''}></input>

            <label>Team Size</label>
            <input type="number"
            onChange={(e)=>setTeamSize(e.target.value)}
            value={teamSize}
            className= {emptyFields.includes('teamSize')?'error':''}></input>

            <label>Project Description</label>
            <input type="text"
            onChange={(e)=>setDesc(e.target.value)}
            value={desc}></input>

            <label>Project link</label>
            <input type="text"
            onChange={(e)=>setLink(e.target.value)}
            value={link}
            className= {emptyFields.includes('link')?'error':''}></input>

            <button>Add Project</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default ProjectForm;