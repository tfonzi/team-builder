import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import TeamMember from './TeamMember'

const Team = ({team, inspect, onDragStart, onDragOver, onDrop}) => {
    
    if(!team){
        return(
            <Paper onDragOver={(e) => onDragOver(e)} 
                    onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"), 
                                            e.dataTransfer.getData("id"), 
                                            'team')}
            >
                <h1>Drag to add to team</h1>
            </Paper>
        )
    }
    else{
        return (
            <Paper onDragOver={(e) => onDragOver(e)} 
                    onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"), 
                                            e.dataTransfer.getData("id"), 
                                            'team')}
            >
                <h1>Team</h1>
                <Paper>
                    <GridList cols={3} spacing={3}>
                        {team.map((obj) => (
                        <GridListTile key={obj._id}>
                            <TeamMember key={obj._id} onDragStart={onDragStart} inspect={inspect} obj={obj} />
                        </GridListTile>
                        ))}
                    </GridList>
                </Paper>
            </Paper>
        )
    }
}

export default Team
