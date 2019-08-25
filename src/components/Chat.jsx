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
	Divider
} from '@material-ui/core';
import { connect } from "react-redux";
import { readRoom } from "../redux/actions";
import { CHANNELS } from "../channels";
import dataApp from "../dataApp.js";

const drawerWidth = 360;

const styles = theme => ({
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
	}
});

class Chat extends React.Component {
	constructor(props){
		super(props);

		this.state = {			
			userScroll: false,
			messageList: document.getElementById("message-list")
		}		
	}

	componentDidMount(){
		this.state.messageList = document.getElementById("message-list")
	}

	componentDidUpdate(){
		//if(this.state.userScroll && this.state.messageList) this.state.messageList.lastChild.scrollIntoView(false);
	}

	render(){
		const { classes } = this.props;

		/*if(this.state.messageList){
			console.log(this.state.messageList.scrollTop , this.state.messageList.scrollHeight - this.state.messageList.clientHeight)

			this.state.userScroll = this.state.messageList.scrollTop != this.state.messageList.scrollHeight - this.state.messageList.clientHeight	
		}*/

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
			        <MessageInput />
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