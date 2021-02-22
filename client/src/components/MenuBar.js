import {Link} from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import './components.css'

const MenuBar = ({title, teamView, berryView, pokemonCatalogView}) => {

    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Pokemon Team Builder</Navbar.Brand>
          <Button className="navbar-button" onClick={teamView} >Team</Button>
          <Button className="navbar-button" onClick={berryView} >Berries</Button>
          <Button className="navbar-button" onClick={pokemonCatalogView} >Pokemon</Button>
          <Link className="navbar-button" to='/debug'> Debug</Link>
        </Navbar>
      </>
    )
}

export default MenuBar
