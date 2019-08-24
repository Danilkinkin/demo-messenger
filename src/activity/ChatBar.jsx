import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Menu,
	MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 360;

const styles = theme => ({
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	headerTitle: {
		flexGrow: 1
	}
});

class ChatBar extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			isMobile: false
		}

		this.state.anchorEl = null;

		this.handleSelectSourceMenu = this.handleSelectSourceMenu.bind(this);
		this.handleSelectSource = this.handleSelectSource.bind(this);
	}

	handleSelectSourceMenu(e) {
		this.state.anchorEl = e.currentTarget;
		this.setState(this.state);
	}

	handleSelectSource(e) {
		this.state.anchorEl = null;
		this.setState(this.state);
	}

	render(){
		const { classes } = this.props;

		return (
	  		<AppBar position="fixed" className={classes.appBar}>
	    		<Toolbar>
			    	<IconButton
			        	color="inherit"
			            aria-label="open drawer"
			            edge="start"
			            onClick={this.handleMenuToggle}
			            className={classes.menuButton}
			    	>
		       			<MenuIcon />
		          	</IconButton>
		          	<Typography variant="h6" className={classes.headerTitle}>
		            	Babai Eban
		          	</Typography>
		          	<Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleSelectSourceMenu}>All channels</Button>
		          	<Menu
						id="simple-menu"
						anchorEl={this.state.anchorEl}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						onClose={this.handleSelectSource}
					>
						<MenuItem onClick={this.handleSelectSource} selected>VK</MenuItem>
						<MenuItem onClick={this.handleSelectSource}>OK</MenuItem>
						<MenuItem onClick={this.handleSelectSource}>FB</MenuItem>
						<MenuItem onClick={this.handleSelectSource}>All channels</MenuItem>
						</Menu>
	        	</Toolbar>
	      	</AppBar>
		);
	}
}


ChatBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatBar);
