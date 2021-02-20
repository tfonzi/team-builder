import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

const MenuBar = ({title, teamView, berryView, pokemonCatalogView}) => {

    const classes = useStyles()

    return (
        <AppBar position="static">
             <Toolbar>
                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                 <MenuIcon />
                 </IconButton>
                 <Typography variant="h4" className={classes.title}>
                 {title}
                 </Typography>
                 <Button onClick={teamView} className={classes.menuButton} variant="contained" size="medium">Team </Button>
                 <Button onClick={berryView} className={classes.menuButton} variant="contained" size="medium">Berries</Button>
                 <Button onClick={pokemonCatalogView} className={classes.menuButton} variant="contained" size="medium">Pokemon Catalog</Button>
                 <Link to='/debug'> Debug</Link>
             </Toolbar>
        </AppBar>
    )
}

export default MenuBar
