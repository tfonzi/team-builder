import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'


const TeamMember = ({obj, inspect, onDragStart}) => {
    return (
        <Card onDragStart={(e) => onDragStart(e, obj.id, 'team')} draggable onClick={() => inspect(obj.id)}>
            <img draggable="false" src={obj.berryImage} alt="berry image" width="100" height="100"/>
            <Typography variant="h5">{obj.berryName} -- {obj.id}</Typography>
            {(obj.nickname) && <Typography variant="body1">"{obj.nickname}"</Typography>}
        </Card>
    )
}

export default TeamMember
