import React from 'react';
import PropTypes from 'prop-types';
import {
	withStyles,
	makeStyles
} from '@material-ui/core/styles';
import {
	Paper,
	CardHeader,
	Container,
	Drawer,
	List,
	ListItem,
	Divider,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Typography 
} from '@material-ui/core';
import { connect } from "react-redux";
import { toggleRoom } from "../redux/actions";

const styles = theme => ({
	root: {
		height: "100%"
	},
	inline: {
		display: 'inline',
	},
	headerDialog: {
		width: "100%",
		display: "flex"
	},
	timeDialog: {
		marginLeft: "auto"
	},
	noDialogs: {
		justifyContent: "center",
	    flexGrow: 1,
	    alignItems: "center",
	    display: "flex"
	},
	unreadDialog: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main),
		marginLeft: "auto",
		float: "right",
	    padding: "3px 6px",
	    lineHeight: "16px",
	    minWidth: "22px",
	    textAlign: "center",
	    borderRadius: "11px"
	}
});

function MessagePreview(props) {
	const classes = makeStyles(styles)();

	return (
		<ListItem alignItems="flex-start" button  onClick={props.onClick} selected={props.selected}>
	        <ListItemAvatar>
	          <Avatar alt="Remy Sharp" aria-label="recipe">{props.roomId[0]}</Avatar>
	        </ListItemAvatar>
	        <ListItemText
	          classes={{ primary: classes.headerDialog }}
	          primary={
	          	<React.Fragment>
	          	  {props.roomId}
	              <Typography
	                component="span"
	                variant="body2"
	                className={ classes.timeDialog }
	                color="textPrimary"
	              >
	                {props.message.ts.getHours()+":"+props.message.ts.getMinutes()}
	              </Typography>	              
	            </React.Fragment>
	          }
	          secondary={
	            <React.Fragment>
	              <Typography
	                component="span"
	                variant="body2"
	                className={classes.inline}
	                color="textPrimary"
	              >
	              	{props.message.autor}
	              </Typography>
	              {" — "+(props.message.body.length > 110? props.message.body.substring(0, 110) + "..." : props.message.body)}
	              {
	              	props.unread > 0?
		              	<Typography
			                component="span"
			                variant="body2"
			            	className={classes.unreadDialog}
			        	>
			            	{props.unread}
			            </Typography>
		            : null
	              }	              
	            </React.Fragment>
	          }
	        />
	      </ListItem>
	)
}

class Chats extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		this.handleSelectRoom = this.handleSelectRoom.bind(this);
	}

	handleSelectRoom(e) {
		this.props.toggleRoom(e);
	}

	render(){
		const { classes } = this.props;

		let list = null;
		if(this.props.chats.timeline.length == 0){
			list = (
				<div className={classes.noDialogs}>
					<Typography variant="subtitle2">
		            	{"Чатов пока нет ("}
		        	</Typography>
	        	</div>
        	);
		}else{
			list = (
				<List className={classes.root}>
	  			{	
	  				this.props.chats.timeline.map((roomId, i) =>
						<React.Fragment key={i}>
			  				<MessagePreview 
			  					roomId={roomId}
			  					message={this.props.chats.rooms[roomId].lastMessage}
			  					onClick={e => this.handleSelectRoom(roomId)}
			  					selected={this.props.chat.roomId === roomId}
			  					unread={this.props.chats.rooms[roomId].unread}
			  				/>
			  				{(i != this.props.chats.timeline.length-1)? <Divider variant="inset" component="li" /> : null}		  			
		  				</React.Fragment>
					)
	  			}
		  		</List>
        	);
		}

		return (
			<React.Fragment>
				<CardHeader title={"Чаты"}></CardHeader>
				{list}
			</React.Fragment>
		);
	}
}


Chats.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  state => state,
  { toggleRoom }
)(withStyles(styles)(Chats));
