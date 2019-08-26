import React from 'react';

import { connect } from "react-redux";
import { readRoom } from "../redux/actions";
import { CHANNELS } from "../channels";

import {
	Container,
	List,
	ListItem,
	Typography,
	ListSubheader,
	Divider,
	Fab,
	Zoom
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import MessageInput from './MessageInput.jsx';

import { preferTime } from "../App.js";


const drawerWidth = 360;

const styles = theme => {
	// FIXME Global variables are not allowed because SSR is enabled
	transitionDuration = transitionDuration(theme);

	return {
		messages: {
			flexGrow: 1
		},
		message: {
			borderRadius: "18px",
		    backgroundColor: theme.palette.grey[300],
		    color: "#282828",
		    marginBottom: "15px",
	    	width: "fit-content",
	    	maxWidth: "90%"
		},
		messageText: {
			whiteSpace: "pre-wrap"
		},
		myMessage: {
			marginLeft: "auto",
		    backgroundColor: theme.palette.primary.main,
		    color: "#fff"
		},
		root: {
			flexGrow: 1,
		    display: "flex",
		    flexDirection: "column"
		},
		selectDialogHelper: {
			height: "100%",
		    display: "flex",
		    alignItems: "center",
		    justifyContent: "center"
		},
		fab: {
		    position: 'fixed',
		    marginBottom: theme.spacing(2),
			right: theme.spacing(2),
			zIndex: 100
		},
		messageTime: {
			marginLeft: "auto",
			float: "right",
			paddingLeft: "8px",
			fontSize: "12px",
		    opacity: .6,
		    marginTop: "3px"
		}
	}
};

let transitionDuration = theme => ({
	enter: theme.transitions.duration.enteringScreen,
	exit: theme.transitions.duration.leavingScreen,
});

class Chat extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userScroll: false,
			messageList: null,
			input: null,
			fabOffset: 0
		}

		this.checkUserScroll = this.checkUserScroll.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}

	componentDidMount(){
		// FIXME It's not allowed to access DOM directly. React refs must be used instead
		//  CRITICAL It's not allowed to mutate state directly. setState must be used instead.
		//  https://ru.reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
		this.state.messageList = document.getElementById("message-list");
	}

	componentDidUpdate(){
		// FIXME State to state transition must be done by setState with callback.
		if(!this.state.userScroll && this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
	}

	checkUserScroll(){
		// FIXME It's not allowed to access DOM directly. React refs must be used instead
		//  https://ru.reactjs.org/docs/refs-and-the-dom.html
		if(!this.state.input) this.state.input = document.getElementById("input-wrp")
		if(this.state.input) this.state.fabOffset = this.state.input.clientHeight;

		// FIXME Wtf?
		this.setState(this.state);
	}

	scrollToBottom(){
		this.state.userScroll = false;
		if(this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
		this.setState(this.state);
	}

	render(){
		const { classes } = this.props;

		// FIXME render must be a pure function.
		this.state.userScroll = document.documentElement.scrollTop != document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let chat = null;
		let room = null;
		let messages = null;
		if(this.props.chats.roomId){
			// FIXME App state relative computations should be done through Redux. It's its main use case.
			room = this.props.chats.rooms[this.props.chats.roomId];
			messages = room.messages.filter(message => this.props.chats.channelId == CHANNELS.ALL || message.channelId == this.props.chats.channelId);
		}

		if(this.props.chats.roomId && messages != null && messages.length){
			// FIXME This should be a separate component.
			messages = messages.map((message, i) => {
				let divider = null;

				// FIXME Why not ternary operator?
				if(
					this.props.chats.channelId == CHANNELS.ALL &&
					(
						i == 0 ||
						room.messages[i-1].channelId != room.messages[i].channelId
					)
				){
					divider = (
						<React.Fragment>
							<Divider />
						<ListSubheader>{message.channelId}</ListSubheader>
					</React.Fragment>
					);
				}

				return (
					<React.Fragment key={i}>
						{divider}
						{/* FIXME classnames library should be used to concat class names */}
						<ListItem alignItems="flex-start" className={classes.message+" "+(message.autor == "Me"? classes.myMessage : "")}>
					        <Typography variant="body2" className={classes.messageText}>
				            	{message.body}
				            	<Typography variant="body2" component="span" className={classes.messageTime}>
				            		{preferTime(message.ts)}
				          		</Typography>
			          		</Typography>
						</ListItem>
					</React.Fragment>
				);
			});

			// FIXME This should be a separate component.
			chat = (
				<React.Fragment>
					<List className={classes.messages}>
						{messages}
			        </List>
			        <MessageInput onChange={this.checkUserScroll}/>
			        <Zoom
						key="primary"
						in={this.state.userScroll}
						timeout={transitionDuration}
						style={{
							transitionDelay: `${this.state.userScroll ? transitionDuration.exit : 0}ms`,
						}}
						unmountOnExit
					>
						<Fab aria-label="Вниз" className={classes.fab} style={{
							bottom: this.state.fabOffset+"px"
						}} color="primary" onClick={this.scrollToBottom}>
							<ArrowDownwardIcon />
						</Fab>
					</Zoom>
				</React.Fragment>
			)
		}else{
			chat = (
				<div className={classes.selectDialogHelper}>
					<Typography variant="subtitle2">
		            	{messages != null? "В этом канале сообщений нет" : "Веберете чат"}
		        	</Typography>
	        	</div>
			)
		}

		return (
	  		<Container maxWidth="md" className={classes.root}>{chat}</Container>
		);
	}
}


Chat.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(
	state => state,
	{ readRoom }
)(withStyles(styles)(Chat));
