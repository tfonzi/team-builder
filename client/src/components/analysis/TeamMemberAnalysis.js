import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'

import Stats from '../misc/Stats'

import './analysis.css'
import '../misc/types.css'

import {findTypeEffects} from './TypeEffects.js'

const TeamMemberAnalysis = ({teamMember}) => {
    
    let defensive_effectiveness = findTypeEffects(teamMember.types, "defending") //teamMember.types is already in an array

    return (
        <div className="analysis-teamMember" id={teamMember._id}>
            <Row>
                <Col xs={5} >
                    <p className="analysis-teamMember-name"> {teamMember.name} </p>
                    <Image draggable="false" src={teamMember.image} />
                    {(teamMember.types.length == 2) && <div>
                        <p className={`type-sm ${teamMember.types[0]}`}>{teamMember.types[0]}</p>
                        <p className={`type-sm ${teamMember.types[1]}`}>{teamMember.types[1]}</p>
                    </div>}
                    {(teamMember.types.length == 1) && <div><p className={`type-sm ${teamMember.types}`}>{teamMember.types}</p></div>}
                </Col>
                <Col xs={7}>
                    <div className="analysis-teamMember-effect">
                        {(teamMember.types.length == 2) && <Row>
                            <Col xs={4}>
                                <p className="type-effect-header">Weak Against: </p> {defensive_effectiveness.weakAgainst.map(weakness => (
                                    <div key={`${teamMember._id}-defend_effect-${weakness.type}`}>
                                        <p className={`type-lg ${weakness.type}`}>{weakness.type}</p>
                                        <p className="multiplier">{weakness.multiplier}x</p>
                                    </div>
                                ))}
                            </Col>
                            <Col xs={4}>
                                <p className="type-effect-header">Resists: </p> {defensive_effectiveness.resists.map(resistance => (
                                    <div key={`${teamMember._id}-defend_effect-${resistance.type}`}>
                                        <p className={`type-lg ${resistance.type}`}>{resistance.type}</p>
                                        <p className="multiplier">{resistance.multiplier}x</p>
                                    </div>    
                                ))}
                            </Col>
                            <Col xs={4}>
                                <p className="type-effect-header">Immune to: </p> {defensive_effectiveness.immune.map(immunity => (
                                    <div key={`${teamMember._id}-defend_effect-${immunity.type}`}>
                                        <p className={`type-lg ${immunity.type}`}>{immunity.type}</p>
                                        <p className="multiplier">{immunity.multiplier}x</p>
                                    </div>                        
                                ))}
                            </Col>
                        </Row>}
                        {(teamMember.types.length == 1) && <Row>
                            <Col xs={4}>
                                <p className="type-effect-header">Weak Against: </p> {defensive_effectiveness.weakAgainst.map(weakness => (
                                    <div key={`${teamMember._id}-defend_effect-${weakness}`}>
                                        <p className={`type-lg ${weakness}`}>{weakness}</p>
                                        <p className="multiplier">2x</p>
                                    </div>
                                ))}
                            </Col>
                            <Col xs={4}>
                                <p className="type-effect-header">Resists: </p> {defensive_effectiveness.resists.map(resistance => (
                                    <div key={`${teamMember._id}-defend_effect-${resistance}`}>
                                        <p className={`type-lg ${resistance}`}>{resistance}</p>
                                        <p className="multiplier">0.5x</p>
                                    </div>    
                                ))}
                            </Col>
                            <Col xs={4}>
                                <p className="type-effect-header">Immune to: </p> {defensive_effectiveness.immune.map(immunity => (
                                    <div key={`${teamMember._id}-defend_effect-${immunity}`}>
                                        <p className={`type-lg ${immunity}`}>{immunity}</p>
                                        <p className="multiplier">0x</p>
                                    </div>                        
                                ))}
                            </Col>
                        </Row>}
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="analysis-stats">
                    <Stats stats={teamMember.stats} />
                </div>
            </Row>
            <div className="analysis-moves">
                <p className="analysis-moves-header">Moves</p>
                {teamMember.moves.map(move => {
                    if(move){ //Incase it loads out of order
                       let offensive_effectiveness = findTypeEffects([move.type], "attacking") //Needs to be in array
                        
                        //For description pop-over
                        const description = (
                            <Popover>
                                <Popover.Title><p className="analysis-move-name">{move.name}</p></Popover.Title>
                                <Popover.Content>
                                    {move.description}
                                </Popover.Content>
                            </Popover>
                        )
                        
                        const focus = (id, move) => { //Adds extra function to force focus for IOS 
                            document.getElementById(`${id}-${move}-desc`).focus();
                        }

                        return (
                        <div className="analysis-move" key={`${teamMember._id}-${move.name}`}>
                            <Row>
                                <Col xs={5}>
                                <p className="analysis-move-name">{move.name}</p>
                                <p className={`type-sm ${move.type}`}>{move.type}</p>
                                <p className="analysis-move-info"> Dmg Class: {move.damage_class}</p>
                                <p className="analysis-move-info"> PP: {move.pp}</p>
                                {(move.power) && <p className="analysis-move-info"> Power: {move.power}</p>}
                                {(move.accuracy) && <p className="analysis-move-info"> Accuracy: {move.accuracy}</p>}
                                <OverlayTrigger trigger="focus" placement="auto" overlay={description}>
                                    <Button id={`${teamMember._id}-${move.name}-desc`} onClick={() => focus(teamMember._id, move.name)} className="analysis-move-description-button" size="sm">Description</Button>
                                </OverlayTrigger>

                                </Col>
                                <Col xs={7}>
                                    <div className="analysis-move-effect">
                                        <Row>
                                            <Col xs={4}>
                                            <p className="type-effect-header">Strong Against: </p> {offensive_effectiveness.strongAgainst.map(strength => (
                                                <div key={`${teamMember._id}-defend_effect-${strength}`}>
                                                    <p className={`type-lg ${strength}`}>{strength}</p>
                                                    <p className="multiplier">2x</p>
                                                </div>
                                            ))}
                                            </Col>
                                            <Col xs={4}>
                                                <p className="type-effect-header">Weak Against: </p> {offensive_effectiveness.weakAgainst.map(weakness => (
                                                    <div key={`${teamMember._id}-defend_effect-${weakness}`}>
                                                        <p className={`type-lg ${weakness}`}>{weakness}</p>
                                                        <p className="multiplier">0.5x</p>
                                                    </div>    
                                                ))}
                                            </Col>
                                            <Col xs={4}>
                                                <p className="type-effect-header">No Effect: </p> {offensive_effectiveness.noEffect.map(immunity => (
                                                    <div key={`${teamMember._id}-defend_effect-${immunity}`}>
                                                        <p className={`type-lg ${immunity}`}>{immunity}</p>
                                                        <p className="multiplier">0x</p>
                                                    </div>                        
                                                ))}
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>                    
                        </div>)
                    }
                    else{ //If bad/no move data comes in
                        return null
                    }
                })}
            </div>
            
        </div>
    )
}

export default TeamMemberAnalysis
