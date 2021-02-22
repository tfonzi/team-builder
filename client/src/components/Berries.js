import Berry from './Berry'

import './components.css'

const Berries = ({berries, inspect, onDragStart}) => {
    return (
        <>
            <h3 className="pokemonCatalog-header">Berry List</h3>
            <div className ="berryCatalog-flex">
                {berries.map((berry) => (
                <div className="berryCatalog-object" key={berry._id}>
                    <Berry key={berry._id} onDragStart={onDragStart} inspect={inspect} berry={berry} />
                </div>
                ))} 
            </div>
        </>
    )
}

export default Berries
