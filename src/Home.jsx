import React from 'react';
import Chat from './components/Chat.jsx';
import ChatBar from './components/ChatBar.jsx';
import ChatsActivity from './components/Chats.jsx';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import {
	CssBaseline,
	Drawer,
	Hidden
} from '@material-ui/core';
import { connect } from "react-redux";
import { toggleMenu } from "./redux/actions";

const drawerWidth = 360;

const styles = theme => {
	console.log(theme)
	return{
		root: {
			display: 'flex',
			height: "100%"
		},
		drawer: {
			[theme.breakpoints.up('md')]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},
		mobileMenu: {
			[theme.breakpoints.up('md')]: {
				display: 'none',
			},
		},
		drawerPaper: {
			maxWidth: drawerWidth,
			width: "100%"
		},
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			display: "flex",
	    	flexDirection: "column",
	    	position: "relative"
		}
	}
};

class Home extends React.Component {
	constructor(props){
		super(props);
		document.title = "Home";

		this.state = {

		}

		this.handleMenuToggle = this.handleChatsActivityToggle.bind(this);
	}

	handleChatsActivityToggle(e) {
		this.setState(this.state);
	}

	render(){
		const { classes } = this.props;

		if(isWidthUp('md', this.props.width) && this.props.app.isMobile) this.props.toggleMenu();

		return (
	  		<div className={classes.root}>
		    	<CssBaseline />
		    	<ChatBar />
		      	<nav className={classes.drawer}>
			        <Hidden mdUp implementation="css">
			        	<Drawer
				            variant="temporary"
				            anchor={'left'}
				            open={this.props.app.isMobile}
		            		onClose={this.props.toggleMenu}
				            classes={{paper: classes.drawerPaper}}
				            className={classes.mobileMenu}
				            ModalProps={{keepMounted: true}}
				        >
			            	{<ChatsActivity/>}
			        	</Drawer>
			        </Hidden>
			        <Hidden smDown implementation="css">
			        	<Drawer
				            classes={{paper: classes.drawerPaper}}
				            variant="permanent"
				            open
			        	>
			            	{<ChatsActivity/>}
			          	</Drawer>
			        </Hidden>
		      	</nav>
		      	<main className={classes.content} id="message-list">
		        	<div className={classes.toolbar} />
		        	<Chat />
		      </main>
		    </div>
		);
	}
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(state => state, { toggleMenu })(withWidth()(withStyles(styles)(Home)));
