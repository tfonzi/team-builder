import express from 'express'

import { createUser, importToUser, fetchBerryCatalog, addBerryToCatalog, fetchBox, fetchBoxObj, addBoxObj, deleteBoxObj, 
        updateBoxObj, fetchTeam, fetchTeamObj, addTeamObj, deleteTeamObj, updateTeamObj, 
            moveTo } from '../controllers/controllers.js'

const router = express.Router()

router.get('/berries', fetchBerryCatalog)
router.post('/berries', addBerryToCatalog)

router.get('/:userId/box', fetchBox)
router.get('/:userId/box/:id', fetchBoxObj)
router.post('/:userId/box', addBoxObj)
router.patch('/:userId/box/delete/:id', deleteBoxObj)
router.patch('/:userId/box/update/:id', updateBoxObj)

router.get('/:userId/team', fetchTeam)
router.get('/:userId/team/:id', fetchTeamObj)
router.post('/:userId/team', addTeamObj)
router.patch('/:userId/team/delete/:id', deleteTeamObj)
router.patch('/:userId/team/update/:id', updateTeamObj)

router.patch('/:userId/:id', moveTo)

router.post('/', createUser)
router.put('/:userId/import', importToUser)









export default router