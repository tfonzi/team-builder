import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import MenuBar from './components/MenuBar'
import Team from './components/Team'
import Berries from './components/Berries'
import Inspector from './components/Inspector'
import Box from './components/Box'
import Debug from './components/Debug'

import Grid from '@material-ui/core/Grid'
import { CardMembership, EmojiObjects } from '@material-ui/icons'

const App = () => {
  
  const [teamBerriesToggle, setTeamBerriesToggle] = useState(0) //Toggles lefthand view between berries and team
  const [inspectView, setInspectView] = useState(3) //This variable toggles between inspect views. 3 -> teams, 1 -> berries, 2 -> box
  const [inspectData, setInspectData] = useState(null) //This variable holds data that goes into inspect window
  const [team, setTeam] = useState([])
  const [box, setBox] = useState([])
  const [berryCatalog, setBerryCatalog] = useState([])

  useEffect(() => {

    const getBerryCatalog = async () => {
      const berriesFromServer = await fetchBerryCatalog()
      setBerryCatalog(berriesFromServer)
    }

    const getBox = async () => {
      const boxobjects = await fetchBox()
      setBox(boxobjects)
    }

    const getTeam = async () => {
      const teamObjects = await fetchTeam()
      setTeam(teamObjects)
    }

    getBerryCatalog()
    getBox()
    getTeam()
  }, [])

  const fetchBerryCatalog = async () => {
    const res = await fetch('http://localhost:5000/berries')
    const data = await res.json()
    return data
  }

  const fetchBox = async () => {
    const res = await fetch('http://localhost:5000/box')
    const data = await res.json()
    return data
  }

  const fetchTeam = async () => {
    const res = await fetch('http://localhost:5000/team')
    const data = await res.json()
    return data
  }

  const addBerryToCatalog = async (berry) => {
    const res = await fetch('http://localhost:5000/berries', 
    {method: "POST", 
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(berry)
    })
    const data = await res.json()

    setBerryCatalog([...berryCatalog, data])
  }

  const addObjToBox = async (obj) => {
    const res = await fetch('http://localhost:5000/box', 
      {method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(obj)
      })
    const data = await res.json()

    setBox([...box, data])
  }

  const addObjToTeam = async (obj) => {
    
    const res = await fetch('http://localhost:5000/team', 
      {method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(obj)
      })
    const data = await res.json()

    setTeam([...team, data])
  }

  const removeObjfromTeam = async (id) => {
    setInspectView(-1)
    await fetch(`http://localhost:5000/team/${id}`, 
    {method: "DELETE",})
    setTeam(team.filter((teamObj) => teamObj.id != id))  
  }

  const removeObjfromBox = async (id) => {
    setInspectView(-1)
    await fetch(`http://localhost:5000/box/${id}`, 
    {method: "DELETE",})
    setBox(box.filter((boxObj) => boxObj.id != id))  
  }

  const removeObj = (data, source) => {

    switch(source){
      case "box": {
        console.log(`Removing id ${data} from Box.`)
        removeObjfromBox(data)
        break
      }
      case "team": {
        console.log(`Removing id ${data} from Team.`)
        removeObjfromTeam(data)
        break
      }
      default:{
        alert("No valid source specified")
        break
      }
    }
  }

  const fetchBoxObj = async (id) => {
    const res = await fetch(`http://localhost:5000/box/${id}`)
    const data = await res.json()
    return data
  }

  const fetchTeamObj = async (id) => {
    const res = await fetch(`http://localhost:5000/team/${id}`)
    const data = await res.json()
    return data
  }

  const moveTo = async (id, source, dest) => {
    
    var res = await fetch(`http://localhost:5000/${source}/${id}`)
    var data = await res.json()
    await fetch(`http://localhost:5000/${source}/${id}`, 
    {method: "DELETE",})

    if(source == "team")
      setTeam(team.filter((teamObj) => teamObj.id != id))

    if(source == "box")
      setBox(box.filter((boxObj) => boxObj.id != id))

    delete data.id

    res = await fetch(`http://localhost:5000/${dest}`, 
      {method: "POST", 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
      })
    data = await res.json()

    if(dest == "team"){
      setTeam([...team, data])
      setInspectView(3)
      setInspectData(data)
    }

    if(dest == "box"){
      setBox([...box, data])
      setInspectView(2)
      setInspectData(data)
    }
  }

  const updateNickname = async (source, id, nickname) => {
    switch (source){
      case "box":{
        const objToUpdate = await fetchBoxObj(id)
        const updatedObj = {...objToUpdate, nickname: nickname}
        const res = await fetch(`http://localhost:5000/box/${id}`, 
          {method: "PUT", 
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(updatedObj)
          })
        const data = await res.json()

        setBox(box.map(
          (boxObj) => boxObj.id === id //For every boxObj, if boxObj.id equals id
          ? {...boxObj, nickname: data.nickname }  //Update boxObj nickname
          : boxObj) //Else, leave boxObj as is
          )
        break
      }

      case "team":{
        const objToUpdate = await fetchTeamObj(id)
        const updatedObj = {...objToUpdate, nickname: nickname}
        const res = await fetch(`http://localhost:5000/team/${id}`, 
          {method: "PUT", 
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify(updatedObj)
          })
        const data = await res.json()

        setTeam(team.map(
          (teamObj) => teamObj.id === id
          ? {...teamObj, nickname: data.nickname }  
          : teamObj) 
          )
        break
      }

      default:
        alert("Source Error in updating nickname.")
    }
  }
  const changeViewToTeams = () => {
    setTeamBerriesToggle(0)
  }

  const changeViewToBerries = () => {
    setTeamBerriesToggle(1)
  }

  const inspectBerry = (id) => {
    const data = berryCatalog.find(berry => berry.id == id)
    setInspectData(data)
    setInspectView(1)
  }

  const inspectBox = (id) => {
    const data = box.find(obj => obj.id == id)
    setInspectData(data)
    setInspectView(2)
  }

  const inspectTeam = (id) => {
    const data = team.find(obj => obj.id == id)
    setInspectData(data)
    setInspectView(3)
  }

  //Beginning of drag code
  const onDragStart = (ev, id, source) => {
    ev.dataTransfer.setData("id", id)
    ev.dataTransfer.setData("source", source)
  } 

  const onDragOver = (ev) => {
    ev.preventDefault()
  }

  const onDrop = (e, source, id, dest) => {

    e.preventDefault()
    
    if(source == dest){
      return //Do nothing if this is the case
    }
    console.log(`Dragged object with id ${id} from ${source} to ${dest}.`)

    //Check Destination
    if(dest == "inspector"){
      if(source == "berryCatalog"){
        inspectBerry(id)
      }
      else if(source == "box"){
        inspectBox(id)
      }
      else if(source == "team"){
        inspectTeam(id)
      }
      return
    }

    //If the dest isn't the inspector, then the user must be dragging object to move to different container
    
    //Performs deep copy for if source is berryCatalog. (If source is "box" or "team", copy is made in moveTo function)
    var obj = null
    var copy = null
    if(source == "berryCatalog"){
        obj = berryCatalog.find((berry) => berry.id == id)
        copy = JSON.parse(JSON.stringify(obj)) //creates deep copy of original obj
        copy.type = "berry"
        copy.nickname = ""
        delete copy.id //Id gets rewritten when moving between containers
    }


    //Destination decision
    switch(dest){

      case "box": {
        console.log(`Adding obj ${id} from ${source} to box.`)
        if(source != "berryCatalog"){
          moveTo(id, source, dest)
        }
        else{
          addObjToBox(copy)
        }
        return
      }

      case "team":{
        if(team.length >= 6){
          alert("You cannot add more than 6 team members")
          return
        }
        console.log(`Adding obj ${id} from ${source} to team.`)
        if(source != "berryCatalog"){
          moveTo(id, source, dest)
        }
        else{
          addObjToTeam(copy)
        }   
        return
      }

      default:
        alert("No valid source specified")
        break
    }
  }

  return (
    <div>
      <Router>
        <Route path='/' exact render={(props) => (
            <>
              <MenuBar title="Berry Team Builder" berryView={changeViewToBerries} teamView={changeViewToTeams} />
              <Grid container>
                <Grid item sm>
                  {(teamBerriesToggle == 0) && <Team onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} inspect={inspectTeam} team={team} />}
                  {(teamBerriesToggle == 1) && <Berries onDragStart={onDragStart} inspect={inspectBerry} berries={berryCatalog} />}
                </Grid>
                <Grid item sm height="100%">
                  <Inspector  onDragOver={onDragOver} onDrop={onDrop} view={inspectView} data={inspectData} updateNickname={updateNickname} AddObjectToBox={addObjToBox} AddObjectToTeam={addObjToTeam} removeObj={removeObj} teamLength={team.length} />
                </Grid>
              </Grid>
              <Box onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} inspect={inspectBox} box={box} />
            </>
          )} />
        <Route path='/debug' exact render={(props) => (
          <Debug addBerry={addBerryToCatalog}/>
        )}/>
      </Router>
    </div>
  );
}

export default App;
