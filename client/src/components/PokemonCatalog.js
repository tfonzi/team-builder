import Paper from '@material-ui/core/Paper'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'



import PokemonCatalogObject from './PokemonCatalogObject'

const PokemonCatalog = ({pokemons, inspect, onDragStart}) => {
    return (
        <>
            <h1>Pokemon Catalog</h1>
            <Paper>
                <GridList cellHeight='200' cols={8} spacing={3}>
                    {pokemons.map((pokemon) => (
                    <GridListTile key={pokemon.id}>
                        <PokemonCatalogObject key={pokemon.id} onDragStart={onDragStart} inspect={inspect} pokemon={pokemon} />
                    </GridListTile>
                    ))}
                </GridList>
            </Paper>
        </>
    )
}

export default PokemonCatalog
