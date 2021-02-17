import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const BoxObj = ({obj, inspect, onDragStart}) => {
    
    return (
        <Card onDragStart={(e) => onDragStart(e, obj._id, 'box')} draggable onClick={() => inspect(obj._id)}>
            <img draggable="false" src={obj.image} alt="image" width="100" height="100"/>
            <Typography variant="h5">{obj.name}</Typography>
            {(obj.nickname) && <Typography variant="body1">"{obj.nickname}"</Typography>}
        </Card>
    )
}

export default BoxObj
