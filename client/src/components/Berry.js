import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'



const Berry = ({berry, inspect, onDragStart}) => {
    return (
        <Card onDragStart={(e) => onDragStart(e, berry._id, 'berryCatalog')} draggable onClick={() => inspect(berry._id)}>
            <img draggable="false" src={berry.image} alt="berry image" width="100" height="100"/>
            <Typography variant="h5">{berry.name}</Typography>
        </Card>
    )
}

export default Berry
