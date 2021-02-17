import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import BoxObj from './BoxObj'



const Box = ({box, inspect, onDragStart, onDragOver, onDrop}) => {
    
    return (
        <Paper onDragOver={(e) => onDragOver(e)} 
                onDrop={(e) => onDrop(e, e.dataTransfer.getData("source"), 
                                        e.dataTransfer.getData("id"), 
                                        'box')}
        >
            <h1>Box</h1>
            <Paper>
                <GridList cols={6} spacing={3}>
                    {box.map((obj) => (
                    <GridListTile key={obj._id}>
                        <BoxObj key={obj._id} onDragStart={onDragStart} inspect={inspect} obj={obj} />
                    </GridListTile>
                    ))}
                </GridList>
            </Paper>
        </Paper>
    )
}

export default Box
