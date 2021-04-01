import express from 'express'
import mongoose from 'mongoose'

import BerryData from '../models/berry.js'
import TeamObjData from '../models/teamObj.js'
import BoxObjData from '../models/boxObj.js'
import User from '../models/User.js'


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
    const { userId } = req.params
    try{
        const userFromServer = await User.findOne({userId: userId})
        const boxFromServer = userFromServer.box
        
        res.status(200).json(boxFromServer)
    } catch (error){
        res.status(404).json({ message: error.message })
    }
}

export const fetchBoxObj = async (req, res) => { 
    const { userId } = req.params
    const { id } = req.params 

    try {
        const userFromServer = await User.findOne({userId: userId})
        const boxObj = userFromServer.box.find(obj => obj._id == id)
        
        res.status(200).json(boxObj) 
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addBoxObj = async(req, res) => {
    const { userId } = req.params
    const {name, image, description, type} = req.body

    const newBoxObj = new BoxObjData({name, image, description, type})
    try{
        const userFromServer = await User.findOne({userId: userId})
        var box = userFromServer.box
        box = [...box, newBoxObj]
        await User.findOneAndUpdate({userId: userId}, {box: box}, { new: true })

        res.status(201).json(newBoxObj)
    } catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const deleteBoxObj = async (req, res) => {
    const { userId, id } = req.params

    try{
        const userFromServer = await User.findOne({userId: userId})
        const box = userFromServer.box.filter(obj => obj._id != id)
        await User.findOneAndUpdate({userId: userId}, {box: box}, { new: true })
        res.json({ message: "Box Object deleted successfully." })
    }
    catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const updateBoxObj = async (req, res) => {
    const { userId, id } = req.params
    const {name, image, description, type, nickname, moves } = req.body
    const updatedBoxObj = { name, image, description, type, nickname, moves, _id: id }

    try{
        const userFromServer = await User.findOne({userId: userId})
        const box = userFromServer.box.map(obj => {
            if(obj._id == id){
                return updatedBoxObj;
            }
            else{
                return obj;
            }
        })

        await User.findOneAndUpdate({userId: userId}, {box: box}, { new: true })
        res.json(updatedBoxObj)
    }
    catch (error){
        res.status(409).json({ message: error.message })
    }
}


//Team Controller -----------------------------------------------------------
export const fetchTeam = async(req, res) => {
    const { userId } = req.params

    try{
        const userFromServer = await User.findOne({userId: userId})
        const teamFromServer = userFromServer.team
        
        res.status(200).json(teamFromServer)
    } catch (error){
        res.status(404).json({ message: error.message })
    }
}

export const fetchTeamObj = async (req, res) => { 
    const { userId } = req.params
    const { id } = req.params 

    try {
        const userFromServer = await User.findOne({userId: userId})
        const teamObj = userFromServer.team.find(obj => obj._id == id)
        
        res.status(200).json(teamObj) 
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addTeamObj = async(req, res) => {
    const { userId } = req.params
    const {name, image, description, type} = req.body

    const newTeamObj = new TeamObjData({name, image, description, type})
    try{
        const userFromServer = await User.findOne({userId: userId})
        var team = userFromServer.team
        team = [...team, newTeamObj]        
        await User.findOneAndUpdate({userId: userId}, {team: team}, { new: true })
        
        res.status(201).json(newTeamObj)
    } catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const deleteTeamObj = async (req, res) => {
    const { userId, id } = req.params

    try{
        const userFromServer = await User.findOne({userId: userId})
        const team = userFromServer.team.filter(obj => obj._id != id)
        await User.findOneAndUpdate({userId: userId}, {team: team}, { new: true })
        res.json({ message: "Team Object deleted successfully." })
    }
    catch (error){
        res.status(409).json({ message: error.message })
    }
}

export const updateTeamObj = async (req, res) => {
    const { userId, id } = req.params
    const {name, image, description, type, nickname, moves } = req.body
    const updatedTeamObj = { name, image, description, type, nickname, moves, _id: id }

    try{
        const userFromServer = await User.findOne({userId: userId})
        const team = userFromServer.team.map(obj => {
            if(obj._id == id){
                return updatedTeamObj;
            }
            else{
                return obj;
            }
        })

        await User.findOneAndUpdate({userId: userId}, {team: team}, { new: true })
        res.json(updatedTeamObj)
    }
    catch (error){
        res.status(409).json({ message: error.message })
    }
}

//General Controller -----------------------------------------------------------
export const moveTo = async (req,res) => {
    const { userId,  id } = req.params
    const {source, destination} = req.body

    try {
        if(source == destination){
            res.status(418).json({ message: error.message })
        }
        else{
            if(source == "team"){
                if(destination =="box"){

                    const userFromServer = await User.findOne({userId: userId})

                    const teamObj = userFromServer.team.find(obj => obj._id == id)


                    //Creating team object
                    const name = teamObj.name
                    const image = teamObj.image
                    const description = teamObj.description
                    const type = teamObj.type
                    const nickname = teamObj.nickname
                    const moves = teamObj.moves
                    const newBoxObj = new BoxObjData({name, image, description, type, nickname, moves})
                    
                    //Remove Object from team
                    const team = userFromServer.team.filter(obj => obj._id != id)


                    //Add Object to box
                    var box = userFromServer.box
                    box = [...box, newBoxObj] 
                          
                    //Update User 
                    await User.findOneAndUpdate({userId: userId}, {team: team, box: box}, { new: true })

                    res.status(200).json(newBoxObj)
                }
                else{
                    res.status(404).json({ message: error.message })
                }
            }
            else if(source == "box"){
                if(destination =="team"){

                    const userFromServer = await User.findOne({userId: userId})

                    const boxObj = userFromServer.box.find(obj => obj._id == id)

                    //Creating team object
                    const name = boxObj.name
                    const image = boxObj.image
                    const description = boxObj.description
                    const type = boxObj.type
                    const nickname = boxObj.nickname
                    const moves = boxObj.moves
                    const newTeamObj = new TeamObjData({name, image, description, type, nickname, moves})
                    
                    //Remove Object from box
                    const box = userFromServer.box.filter(obj => obj._id != id)

                    //Add Object to team
                    var team = userFromServer.team
                    team = [...team, newTeamObj] 
                    
                    //Update User 
                    await User.findOneAndUpdate({userId: userId}, {team: team, box: box}, { new: true })

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



//=================================================================================================================================

export const createUser = async(req, res) => {
    var userId = req.body.userId
    const team = []
    const box = []

    userId = userId.replace('|', '_') //routing doesn't like '|'

    const alreadyExist = await User.findOne({userId: userId})
    if(alreadyExist){
        res.status(409).json({ message: 'User already exists' })
    }
    else{
        const user = new User({ userId, team, box })

        try{
            await user.save()
            res.status(201).json(user)
        } catch (error){
            res.status(409).json({ message: error.message })
        }
    } 
}

export const importToUser = async(req, res) => {
    const {userId} = req.params
    const {guestTeam, guestBox} = req.body
    
    try{
        const userFromServer = await User.findOne({userId: userId})
        var newBox = [...userFromServer.box]

        //Transfering guestTeam
        guestTeam.map(teamObj => {
            //Creating team object
            const name = teamObj.name
            const image = teamObj.image
            const description = teamObj.description
            const type = teamObj.type
            const nickname = teamObj.nickname
            const moves = teamObj.moves
            const newBoxObj = new BoxObjData({name, image, description, type, nickname, moves})
            newBox = [...newBox, newBoxObj]
        })

        //Transfering guestBox
        guestBox.map(boxObj => {
            //Creating team object
            const name = boxObj.name
            const image = boxObj.image
            const description = boxObj.description
            const type = boxObj.type
            const nickname = boxObj.nickname
            const moves = boxObj.moves
            const newBoxObj = new BoxObjData({name, image, description, type, nickname, moves})
            newBox = [...newBox, newBoxObj]
        })

        await User.findOneAndUpdate({userId: userId}, {box: newBox}, { new: true })
        res.json(newBox)
    }
    catch (error){
        res.status(409).json({ message: error.message })
    }
}



export default router 