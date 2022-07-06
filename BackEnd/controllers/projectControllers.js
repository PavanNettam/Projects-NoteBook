const Project = require('../models/projectModel')
const mongoose = require('mongoose')

const postProject = async (req,res) =>{
    const {title, teamSize, desc, link} = req.body;

    let emptyFields = []
    
    if(!title){
        emptyFields.push('title')
    }
    if(!teamSize){
        emptyFields.push('teamSize')
    }
    if(!link){
        emptyFields.push('link')
    }
    if(emptyFields.length>0){
        res.status(400).json({error : 'Please fill in all required fileds', emptyFields});
    }

    try{
        const project =  await Project.create({title, teamSize, desc, link});
        res.status(200).json(project);
    }catch(err){
        res.status(400).json({error : err.message});
    }

}

const getProjects = async (req,res) => {
    const Projects = await Project.find({}).sort({createdAt:-1});
    res.status(202).json(Projects);
}

const getProject = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such id"});
    }

    const project = await Project.findById(id);

    if(!project){
        return res.status(404).json({error:"No such id"});
    }
    
    res.status(200).json(project);
}

const deleteProject = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such id"});
    }

    const project = await Project.findOneAndDelete({_id: id})

    if(!project){
        return res.status(404).json({error:"No such id"});
    }
    
    res.status(200).json(project);
}

const updateProject = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such id"});
    }

    const project = await Project.findOneAndUpdate({_id: id},{
        ...req.body
    })

    res.status(200).json(project);
}

module.exports = {postProject, getProjects, getProject, deleteProject, updateProject};