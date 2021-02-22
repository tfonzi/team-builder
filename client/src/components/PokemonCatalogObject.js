const PokemonCatalogObject = ({pokemon, inspect, onDragStart}) => {
    return (
        <div onDragStart={(e) => onDragStart(e, pokemon.id, 'pokemonCatalog')} draggable onClick={() => inspect(pokemon.id)}>
            <img draggable="false" src={pokemon.image} alt="Pokemon image" width="100" height="100"/>
            <h4>{pokemon.name}</h4>
            <h5>{pokemon.id}</h5>
        </div>
    )
}

export default PokemonCatalogObject
