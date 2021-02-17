import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import {useState} from 'react'

const Inspector = ({view, object, onDragOver, onDrop, updateNickname, AddObjectToBox, AddObjectToTeam, removeObj}) => {
    
    const [nickname, setNickname] = useState("")

    const sendNickname = () =>{
        if(nickname){
            
            if(view == "inspectBox")
                updateNickname("box", object._id, nickname)

            if(view == "inspectTeam")
                updateNickname("team", object._id, nickname)
            
            object.nickname = nickname
            setNickname("")
        }
        else{
            alert("Type in a nickname")
        }
    }

    const sendObject = (source) =>{

        var copy = JSON.parse(JSON.stringify(object)) //creates deep copy of original obj
        copy.nickname = ""
        delete copy._id
        if(source == "box"){
            AddObjectToBox(copy)
        }

        if(source == "team"){
            AddObjectToTeam(copy)
        }
    }

    if(!object){
        return(
            <Paper
                onDragOver={(e) => onDragOver(e)} 
                onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                        e.dataTransfer.getData("id"),
                                        "inspector")}
            >
                <div height="500px">
                    <h1>Click to Inspect!</h1>
                </div>
            </Paper>
        )
    }
    else{
        switch(view){

            case "inspectBerryCatalog": //BerryCatalog Inspect
                return(
                        <Paper 
                            onDragOver={(e) => onDragOver(e, "inspector")} 
                            onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                    e.dataTransfer.getData("id"),
                                                    "inspector")}
                        >
                            <Typography variant="h5">{object.name}</Typography>
                            <img draggable="false" src={object.image} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{object.description}</Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={() => sendObject("team")} variant="contained" color="primary">Add to Team</Button>
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => sendObject("box")} variant="contained" color="primary">Add to Box</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    )
            case "inspectBox": //Box Inspect 
                return(
                    <Paper 
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        <>
                            <Typography variant="h5">{object.name}</Typography>
                            {(object.nickname) && <Typography variant="h6">"{object.nickname}"</Typography>}
                            <img draggable="false" src={object.image} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{object.description}</Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={sendNickname} variant="contained" color="primary">Change Nickname</Button>
                                    <input type="text" placeholder="Enter nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => removeObj(object._id, "box")} variant="contained" color="secondary">Remove from box</Button>
                                </Grid>
                            </Grid>
                        </>
                    </Paper>
                )

            case "inspectTeam": //Team Inspect 
                return(
                    <Paper 
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        <>
                            <Typography variant="h5">{object.name}</Typography>
                            {(object.nickname) && <Typography variant="h6">"{object.nickname}"</Typography>}
                            <img draggable="false" src={object.image} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{object.description}</Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={sendNickname} variant="contained" color="primary">Change Nickname</Button>
                                    <input type="text" placeholder="Enter nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => removeObj(object._id, "team")} variant="contained" color="secondary">Remove from team</Button>
                                </Grid>
                            </Grid>
                        </>
                    </Paper>
                )
                
            default:
                return(
                    <Paper
                        onDragOver={(e) => onDragOver(e)} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        <div height="500px">
                            <h1>Click to Inspect!</h1>
                        </div>
                    </Paper>
                )
        }
    }
}

export default Inspector
