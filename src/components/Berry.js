import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'



const Berry = ({berry, inspect, onDragStart}) => {
    return (
        <Card onDragStart={(e) => onDragStart(e, berry.id, 'berryCatalog')} draggable onClick={() => inspect(berry.id)}>
            <img draggable="false" src={berry.berryImage} alt="berry image" width="100" height="100"/>
            <Typography variant="h5">{berry.berryName}</Typography>
        </Card>
    )
}

export default Berry
