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
import { connect } from "react-redux";
import { toggleMenu, toggleChannel, readRoom } from "../redux/actions";
import { CHANNELS } from "../channels";

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
		this.handleMenuToggle = this.handleMenuToggle.bind(this);
	}

	handleSelectSourceMenu(e) {
		this.state.anchorEl = e.currentTarget;
		this.setState(this.state);
	}

	handleSelectSource(e) {
		this.state.anchorEl = null;
		this.setState(this.state);
		if(e){
			this.props.toggleChannel(e);
			this.props.readRoom(this.props.chat.roomId);
		}
	}

	handleMenuToggle() {
		this.props.toggleMenu();
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
		            	{this.props.chat.roomId || "Чат не выбран"}
		          	</Typography>
		          	<Button 
		          		color="inherit"
		          		aria-controls="simple-menu" 
		          		aria-haspopup="true" 
		          		onClick={this.handleSelectSourceMenu}
		          	>
		          		{this.props.chat.channelId}
		          	</Button>
		          	<Menu
						id="simple-menu"
						anchorEl={this.state.anchorEl}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						onClose={e => this.handleSelectSource()}
						
					>
						<MenuItem
							onClick={e => this.handleSelectSource(CHANNELS.VK)}
							selected={this.props.chat.channelId === CHANNELS.VK}
						>
							VK
						</MenuItem>
						<MenuItem
							onClick={e => this.handleSelectSource(CHANNELS.OK)}
							selected={this.props.chat.channelId === CHANNELS.OK}
						>
							OK
						</MenuItem>
						<MenuItem
							onClick={e => this.handleSelectSource(CHANNELS.FB)}
							selected={this.props.chat.channelId === CHANNELS.FB}
						>
							FB
						</MenuItem>
						<MenuItem
							onClick={e => this.handleSelectSource(CHANNELS.ALL)}
							selected={this.props.chat.channelId == CHANNELS.ALL}
						>
							All channels
						</MenuItem>
						</Menu>
	        	</Toolbar>
	      	</AppBar>
		);
	}
}


ChatBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  state => state,
  { toggleMenu, toggleChannel, readRoom }
)(withStyles(styles)(ChatBar));
