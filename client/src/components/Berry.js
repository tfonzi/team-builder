
const Berry = ({berry, inspect, onDragStart}) => {
    return (
        <div onDragStart={(e) => onDragStart(e, berry._id, 'berryCatalog')} draggable onClick={() => inspect(berry._id)}>
            <img draggable="false" src={berry.image} alt="berry image" width="100" height="100"/>
            <h5>{berry.name}</h5>
        </div>
    )
}

export default Berry
