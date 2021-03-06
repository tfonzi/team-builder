import PokemonCatalogObject from './PokemonCatalogObject'
import {useEffect} from 'react'

import './containers.css'

const PokemonCatalog = ({pokemons, inspect, onDragStart, active, scrollState}) => {
    
    useEffect(() => {
        var el = document.getElementById("PCScroll")
        el.scrollTop = scrollState
    })

    return (
        <>
            <div id="PCScroll" className="pokemonCatalog-flex">
                {pokemons.map((pokemon) => (
                <div key={pokemon.id}>
                    {(active == `pokemonCatalog ${pokemon.id}`) && <div className="active-pokemonCatalog-object" key={pokemon.id}> <PokemonCatalogObject  key={pokemon.id} onDragStart={onDragStart} inspect={inspect} pokemon={pokemon} /> </div>}
                    {(active != `pokemonCatalog ${pokemon.id}`) && <div className="pokemonCatalog-object" key={pokemon.id}> <PokemonCatalogObject  key={pokemon.id} onDragStart={onDragStart} inspect={inspect} pokemon={pokemon} /> </div>}
                </div>
                ))}
            </div>
        </>
    )
}

export default PokemonCatalog
