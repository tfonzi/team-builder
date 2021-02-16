import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

import {useState} from 'react'

const Inspector = ({view, data, onDragOver, onDrop, updateNickname, AddObjectToBox, AddObjectToTeam, removeObj, teamLength}) => {
    
    const [nickname, setNickname] = useState("")

    const sendNickname = () =>{
        if(nickname){
            
            if(view == 2)
                updateNickname("box", data.id, nickname)

            if(view == 3)
                updateNickname("team", data.id, nickname)
            
            data.nickname = nickname
            setNickname("")
        }
        else{
            alert("Type in a nickname")
        }
    }

    const sendObject = (source) =>{

        var copy = JSON.parse(JSON.stringify(data)) //creates deep copy of original obj
        copy.type = "berry"
        copy.nickname = ""
        delete copy.id
        if(source == "box"){
            AddObjectToBox(copy)
        }

        if(source == "team"){
            if(teamLength >= 6){
                alert("You cannot add more than 6 team members")
                return
            }
            AddObjectToTeam(copy)
        }
    }

    if(!data){
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

            case 1: //BerryCatalog Inspect
                return(
                        <Paper 
                            onDragOver={(e) => onDragOver(e, "inspector")} 
                            onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                    e.dataTransfer.getData("id"),
                                                    "inspector")}
                        >
                            <Typography variant="h5">{data.berryName}</Typography>
                            <img draggable="false" src={data.berryImage} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{data.berryDescription}</Typography>
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
            case 2: //Box Inspect 
                return(
                    <Paper 
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        <>
                            <Typography variant="h5">{data.berryName}</Typography>
                            {(data.nickname) && <Typography variant="h6">"{data.nickname}"</Typography>}
                            <img draggable="false" src={data.berryImage} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{data.berryDescription}</Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={sendNickname} variant="contained" color="primary">Change Nickname</Button>
                                    <input type="text" placeholder="Enter nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => removeObj(data.id, "box")} variant="contained" color="secondary">Remove from box</Button>
                                </Grid>
                            </Grid>
                        </>
                    </Paper>
                )

            case 3: //Team Inspect 
                return(
                    <Paper 
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        <>
                            <Typography variant="h5">{data.berryName}</Typography>
                            {(data.nickname) && <Typography variant="h6">"{data.nickname}"</Typography>}
                            <img draggable="false" src={data.berryImage} alt="berry image" width="300" height="300"/>
                            <Typography variant="body1">{data.berryDescription}</Typography>
                            <Grid container>
                                <Grid item xs>
                                    <Button onClick={sendNickname} variant="contained" color="primary">Change Nickname</Button>
                                    <input type="text" placeholder="Enter nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                                </Grid>
                                <Grid item xs>
                                    <Button onClick={() => removeObj(data.id, "team")} variant="contained" color="secondary">Remove from team</Button>
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
