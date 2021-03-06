import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import './inspector.css'
import '../misc/types.css'

import Stats from '../misc/Stats'
import Moves from './Moves'

import {useState} from 'react'

const Inspector = ({view, object, apiData, onDragOver, onDrop, updatePokemonMoves, updateNickname, AddObjectToBox, AddObjectToTeam, removeObj, moveTo}) => {
    
    const [nickname, setNickname] = useState("")

    const [addedToTeam, setAddedToTeam] = useState(false)
    const [addedToBox, setAddedToBox] = useState(false)

    const signifyAddedToTeam = () => {
        setAddedToTeam(true)
        setTimeout(() => {setAddedToTeam(false)}, 1000)
    }

    const signifyAddedToBox = () => {
        setAddedToBox(true)
        setTimeout(() => {setAddedToBox(false)}, 1000)
    }

    const sendNickname = () =>{
                
        if(nickname){
            
            if(view == "inspectBox")
                updateNickname("box", object._id, nickname)

            if(view == "inspectTeam")
                updateNickname("team", object._id, nickname)
            
            object.nickname = nickname
            setNickname("")
        }
        else{ //delete nickname
            if(view == "inspectBox")
                updateNickname("box", object._id, "")

            if(view == "inspectTeam")
                updateNickname("team", object._id, "")
            
            object.nickname = ""
            setNickname("")
        }
    }

    const sendObject = (source) =>{

        var copy = JSON.parse(JSON.stringify(object)) //creates deep copy of original obj
        copy.type = ""
        if(view == "inspectBerryCatalog"){
            copy.type = "berry"
        }
        else if(view == "inspectPokemonCatalog"){
            copy.type = "pokemon"
        }
        else if(view == "inspectItemCatalog"){
            copy.type = "item"
        }
        copy.nickname = ""
        delete copy._id
        if(source == "box"){
            signifyAddedToBox()
            AddObjectToBox(copy)
        }

        if(source == "team"){
            signifyAddedToTeam()
            AddObjectToTeam(copy)
        }
    }

    const resetFocus = () => {
        window.scrollTo(0, 0)
    }

    if(!object){
        return(
            <div className="rightSideView"
                onDragOver={(e) => onDragOver(e)} 
                onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                        e.dataTransfer.getData("id"),
                                        "inspector")}
            >
            </div>
        )
    }
    else{
        switch(view){

            case "inspectPokemonCatalog": //PokemonCatalog Inspect 
            
                return(
                    <div className="rightSideView"
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                    
                        <Row className="inspector-rows">
                            <Col className="inspector-cols">
                                <p className="inspector-name">{object.name}</p>
                                <Image draggable="false" src={object.image}/>
                                {(apiData.types.length == 2) && <div><p className={`inspector-type ${apiData.types[0]}`}>{apiData.types[0]}</p><p className={`inspector-type ${apiData.types[1]}`}>{apiData.types[1]}</p></div>}
                                {(apiData.types.length == 1) && <div><p className={`inspector-type ${apiData.types}`}>{apiData.types}</p></div>}
                            </Col>
                            <Col className="inspector-cols">
                                <div className="inspector-buttons">
                                    <Button className={addedToTeam?"hide inspector-button":"inspector-button"} variant="success" onClick={() => sendObject("team")} >Add to Team</Button>
                                    <Button className={addedToTeam?"inspector-button":"hide inspector-button"} variant="success" disabled >Sent to team!</Button>
                                    <Button className={addedToBox?"hide inspector-button":"inspector-button"} onClick={() => sendObject("box")} >Add to Box</Button>
                                    <Button className={addedToBox?"inspector-button":"hide inspector-button"} disabled >Sent to box!</Button>
                                </div>
                            </Col>
                        </Row>
                        <p className="inspector-header">Stats</p>
                        <Row className="inspector-rows">
                            
                            {(apiData.stats) && <Stats stats={apiData.stats} />}
                        </Row>
                    </div>
                )

            case "inspectItemCatalog": //ItemCatalog Inspect 
            
                return(
                    <div className="rightSideView"
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                    
                        <Row className="inspector-rows">
                            <Col xs={7} sm={7} className="inspector-cols">
                                <p className="inspector-name">{object.name}</p>
                                <Image className="inspector-item-image" draggable="false" src={object.image}/>
                            </Col>
                            <Col xs={5} sm={5} className="inspector-cols">
                                <Button className={addedToBox?"hide inspector-item-button":"inspector-item-button"} onClick={() => sendObject("box")} >Add to Box</Button>
                                <Button className={addedToBox?"inspector-item-button":"hide inspector-item-button"} disabled >Sent to Box!</Button>
                            </Col>
                        </Row>
                        <p className="p-inspector-item">{apiData.description}</p>
                        
                    </div>
                )

                
            case "inspectBox": //Box Inspect 
                
                if(object.type === "item"){
                    return(
                        <div className="rightSideView"
                            onDragOver={(e) => onDragOver(e, "inspector")} 
                            onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                    e.dataTransfer.getData("id"),
                                                    "inspector")}
                        >
                            <p className="inspector-name">{object.name}</p>
                            <Image className="inspector-item-image" draggable="false" src={object.image}/>
                            <p>{apiData.description}</p>
                            <Button className="inspector-button" variant="danger" onClick={() => removeObj(object._id, "box")}>Remove from box</Button>
                                
                        </div>
                    )
                }
                else if (object.type === "pokemon"){
                    
                    return(
                        <div className="rightSideView"
                            onDragOver={(e) => onDragOver(e, "inspector")} 
                            onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                    e.dataTransfer.getData("id"),
                                                    "inspector")}
                        >
                            <Row className="inspector-rows">
                                <Col className="inspector-cols">
                                    <p className="inspector-name">{object.name}</p>
                                    {(object.nickname) && <p className="p">"{object.nickname}"</p>}
                                    <Image fluid draggable="false" src={object.image}/>
                                    {(apiData.types.length == 2) && <div><p className={`inspector-type ${apiData.types[0]}`}>{apiData.types[0]}</p><p className={`inspector-type ${apiData.types[1]}`}>{apiData.types[1]}</p></div>}
                                    {(apiData.types.length == 1) && <div><p className={`inspector-type ${apiData.types}`}>{apiData.types}</p></div>}
                                </Col>
                                <Col className="inspector-cols">
                                    <div className="inspector-buttons">
                                        <Button className="inspector-button" variant="danger" onClick={() => removeObj(object._id, "box")}> Remove from box</Button>
                                        <Button className="inspector-button" variant="success" onClick={() => moveTo(object._id, "box", "team")}> Move to Team</Button>
                                    </div>
                                </Col>
                            </Row>
                            <div className="inspector-nickname">
                                <Button className="inspector-nickname-button" variant="warning" onClick={sendNickname} >Name!</Button>
                                <input className="inspector-nickname-field" type="text" placeholder="Enter nickname" value={nickname} onBlur={() => resetFocus()} onChange={(e) => setNickname(e.target.value)} />
                            </div>
                            <div>
                                <p className="inspector-header">Stats</p>
                                {(apiData.stats) && <Stats stats={apiData.stats} />} 
                                <p className="inspector-header">Moves</p> 
                                {(apiData.moves) && <Moves key={object._id} pokemon={object} source="box" updatePokemonMoves={updatePokemonMoves} movesAPI={apiData.moves} />}    
                            </div>
                        </div>
                    )
                }
                else{
                    return(<p>Error in displaying box object of type {object.type}</p>)
                }
            
            case "inspectTeam": //Team Inspect 
                return(
                    <div className="rightSideView"
                        onDragOver={(e) => onDragOver(e, "inspector")} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                        
                        <Row className="inspector-rows">
                            <Col className="inspector-cols">
                                <p className="inspector-name">{object.name}</p>
                                {(object.nickname) && <p className="p">"{object.nickname}"</p>}
                                <Image fluid draggable="false" src={object.image}/>
                                {(apiData.types.length == 2) && <div><p className={`inspector-type ${apiData.types[0]}`}>{apiData.types[0]}</p><p className={`inspector-type ${apiData.types[1]}`}>{apiData.types[1]}</p></div>}
                                {(apiData.types.length == 1) && <div><p className={`inspector-type ${apiData.types}`}>{apiData.types}</p></div>}
                            </Col>
                            <Col className="inspector-cols">
                                <div className="inspector-buttons">
                                    <Button className="inspector-button" variant="danger" onClick={() => removeObj(object._id, "team")} >Remove from team</Button>
                                    <Button className="inspector-button" onClick={() => moveTo(object._id, "team", "box")} >Move to Box</Button>
                                </div>
                            </Col>
                        </Row>
                        <div className="inspector-nickname">
                            <Button className="inspector-nickname-button" variant="warning" onClick={sendNickname} >Name!</Button>
                            <input className="inspector-nickname-field" type="text" placeholder="Enter nickname" value={nickname} onBlur={() => resetFocus()} onChange={(e) => setNickname(e.target.value)} />
                        </div> 
                        <div>
                            <p className="inspector-header">Stats</p>
                            {(apiData.stats) && <Stats stats={apiData.stats} />} 
                            <p className="inspector-header">Moves</p> 
                            {(apiData.moves) && <Moves key={object._id} pokemon={object} source="team" updatePokemonMoves={updatePokemonMoves} movesAPI={apiData.moves} />}    
                        </div>
                    </div>
                )
                
            default:
                return(
                    <div className="rightSideView"
                        onDragOver={(e) => onDragOver(e)} 
                        onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"),
                                                e.dataTransfer.getData("id"),
                                                "inspector")}
                    >
                    </div>
                )
        }
    }
}

export default Inspector
