import express from 'express'

import { fetchBerryCatalog, addBerryToCatalog, fetchBox, fetchBoxObj, addBoxObj, deleteBoxObj, 
        updateBoxObj, fetchTeam, fetchTeamObj, addTeamObj, deleteTeamObj, updateTeamObj, 
            moveTo } from '../controllers/controllers.js'

const router = express.Router()

router.get('/berries', fetchBerryCatalog)
router.post('/berries', addBerryToCatalog)

router.get('/box', fetchBox)
router.get('/box/:id', fetchBoxObj)
router.post('/box', addBoxObj)
router.delete('/box/:id', deleteBoxObj)
router.patch('/box/:id', updateBoxObj)

router.get('/team', fetchTeam)
router.get('/team/:id', fetchTeamObj)
router.post('/team', addTeamObj)
router.delete('/team/:id', deleteTeamObj)
router.patch('/team/:id', updateTeamObj)

router.post('/:id', moveTo)



export default router