import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'



import Berry from './Berry'

const Berries = ({berries, inspect, onDragStart}) => {
    return (
        <>
            <h1>Berry List</h1>
            <Paper>
                <GridList cols={3} spacing={3}>
                    {berries.map((berry) => (
                    <GridListTile key={berry._id}>
                        <Berry key={berry._id} onDragStart={onDragStart} inspect={inspect} berry={berry} />
                    </GridListTile>
                    ))}
                </GridList>
            </Paper>
        </>
    )
}

export default Berries
