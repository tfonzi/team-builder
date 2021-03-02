import express from 'express'
import mongoose from 'mongoose'

import BerryData from '../models/berry.js'
import TeamObjData from '../models/teamObj.js'
import BoxObjData from '../models/boxObj.js'

const router = express.Router()


//BerryCatalog Controller -----------------------------------------------------------
export const fetchBerryCatalog = async(req, res) => {
    try{
        const berriesFromServer = await BerryData.find()
        
        res.status(200).json(berriesFromServer)
    } catch (error){
        res.status(404).json({ message: error.message })
    }
}

export const addBerryToCatalog = async(req, res) => {
    const {name, image, description} = req.body

    const newBerry = new BerryData({name, image, description})

    try{
        await newBerry.save()
        
        res.status(201).json(newBerry)
    } catch (error){
        res.status(409).json({ message: error.message })
    }
}


//Box Controller -----------------------------------------------------------

export const fetchBox = async(req, res) => {
    try{
        const boxFromServer = await BoxObjData.find()
        
        res.status(200).json(boxFromServer)
    } catch (error){
        res.status(404).json({ message: error.message })
    }
}

export const fetchBoxObj = async (req, res) => { 
    const { id } = req.params 

    try {
        const boxObj = await BoxObjData.findById(id) 
        
        res.status(200).json(boxObj) 
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addBoxObj = async(req, res) => {
    const {name, image, description, type} = req.body

    const newBoxObj = new BoxObjData({name, image, description, type})

    try{
        await newBoxObj.save()
        
        res.status(201).json(newBoxObj)
    } catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const deleteBoxObj = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Box Object with id: ${id}`)

    await BoxObjData.findByIdAndRemove(id)

    res.json({ message: "Box Object deleted successfully." })
}

export const updateBoxObj = async (req, res) => {
    const { id } = req.params
    const {name, image, description, type, nickname } = req.body
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Box Object with id: ${id}`)

    const updatedBoxObj = { name, image, description, type, nickname, _id: id }

    await BoxObjData.findByIdAndUpdate(id, updatedBoxObj, { new: true })

    res.json(updatedBoxObj)
}


//Team Controller -----------------------------------------------------------
export const fetchTeam = async(req, res) => {
    try{
        const teamFromServer = await TeamObjData.find()
        
        res.status(200).json(teamFromServer)
    } catch (error){
        res.status(404).json({ message: error.message })
    }
}

export const fetchTeamObj = async (req, res) => { 
    const { id } = req.params

    try {
        const teamObj = await TeamObjData.findById(id)
        
        res.status(200).json(teamObj)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addTeamObj = async(req, res) => {
    const {name, image, description, type} = req.body

    const newTeamObj = new TeamObjData({name, image, description, type})

    try{
        await newTeamObj.save()
        
        res.status(201).json(newTeamObj)
    } catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const deleteTeamObj = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Team Object with id: ${id}`)

    await TeamObjData.findByIdAndRemove(id)

    res.json({ message: "Team Object deleted successfully." })
}

export const updateTeamObj = async (req, res) => {
    const { id } = req.params
    const {name, image, description, type, nickname } = req.body
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Team Object with id: ${id}`)

    const updatedTeamObj = { name, image, description, type, nickname, _id: id }

    await TeamObjData.findByIdAndUpdate(id, updatedTeamObj, { new: true })

    res.json(updatedTeamObj)
}

//General Controller -----------------------------------------------------------
export const moveTo = async (req,res) => {
    const { id } = req.params
    const {source, destination} = req.body

    try {
        if(source == destination){
            res.status(418).json({ message: error.message })
        }
        else{
            if(source == "team"){
                if(destination =="box"){
                    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Team Object with id: ${id}`)

                    const teamObj = await TeamObjData.findById(id)
                    await TeamObjData.findByIdAndRemove(id)

                    const name = teamObj.get('name')
                    const image = teamObj.get('image')
                    const description = teamObj.get('description')
                    const type = teamObj.get('type')
                    const nickname = teamObj.get('nickname')

                    const newBoxObj = new BoxObjData({name, image, description, type, nickname})
                    await newBoxObj.save()

                    res.status(200).json(newBoxObj)
                }
                else{
                    res.status(404).json({ message: error.message })
                }
            }
            else if(source == "box"){
                if(destination =="team"){
                    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Box Object with id: ${id}`)

                    const boxObj = await BoxObjData.findById(id)
                    await BoxObjData.findByIdAndRemove(id)

                    const name = boxObj.get('name')
                    const image = boxObj.get('image')
                    const description = boxObj.get('description')
                    const type = boxObj.get('type')
                    const nickname = boxObj.get('nickname')

                    const newTeamObj = new TeamObjData({name, image, description, type, nickname})
                    await newTeamObj.save()

                    res.status(200).json(newTeamObj)

                }
                else{
                    res.status(404).json({ message: error.message })
                }
            }
            else{
                res.status(404).json({ message: error.message })
            }
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}



export default router 