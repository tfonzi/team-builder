import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'



const PokemonCatalogObject = ({pokemon, inspect, onDragStart}) => {
    return (
        <Card onDragStart={(e) => onDragStart(e, pokemon.id, 'pokemonCatalog')} draggable onClick={() => inspect(pokemon.id)}>
            <img draggable="false" src={pokemon.image} alt="Pokemon image" width="100" height="100"/>
            <Typography variant="h5">{pokemon.name}</Typography>
            <Typography variant="body1">{pokemon.id}</Typography>
        </Card>
    )
}

export default PokemonCatalogObject
