const BoxObj = ({obj, inspect, onDragStart}) => {
    
    return (
        <div onDragStart={(e) => onDragStart(e, obj._id, 'box')} draggable onClick={() => inspect(obj._id)}>
            <img draggable="false" src={obj.image} alt="image" width="100" height="100"/>
            <h4>{obj.name}</h4>
            {(obj.nickname) && <h5>"{obj.nickname}"</h5>}
        </div>
    )
}

export default BoxObj
