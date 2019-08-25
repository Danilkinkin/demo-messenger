import React from 'react';
import MessageInput from './MessageInput.jsx';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
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
import { connect } from "react-redux";
import { readRoom } from "../redux/actions";
import { CHANNELS } from "../channels";
import dataApp from "../dataApp.js";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { preferTime } from "../App.js";

const drawerWidth = 360;

const styles = theme => {
	transitionDuration = transitionDuration(theme);
	console.log(transitionDuration)
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
		this.state.messageList = document.getElementById("message-list");
		//this.state.input = document.getElementById("input-wrp");
		//this.checkUserScroll();
	}

	componentDidUpdate(){
		//if(!this.state.userScroll && this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
		if(!this.state.userScroll && this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
	}

	checkUserScroll(){
		if(!this.state.input) this.state.input = document.getElementById("input-wrp")
		if(this.state.input) this.state.fabOffset = this.state.input.clientHeight;

		this.setState(this.state);
	}

	scrollToBottom(){
		this.state.userScroll = false;
		if(this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
		this.setState(this.state);
	}

	render(){
		const { classes } = this.props;

		this.state.userScroll = document.documentElement.scrollTop != document.documentElement.scrollHeight - document.documentElement.clientHeight;

		let chat = null;
		let room = null;
		let messages = null;
		if(this.props.chat.roomId){
			room = dataApp.rooms[this.props.chat.roomId];
			messages = room.messages.filter(message => this.props.chat.channelId == CHANNELS.ALL || message.channelId == this.props.chat.channelId);
		}

		if(this.props.chat.roomId && messages != null && messages.length){
			messages = messages.map((message, i) => {
				let divider = null;

				if(
					this.props.chat.channelId == CHANNELS.ALL &&
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
		            	{messages != null? "Сообщений нет" : "Веберете чат"}
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