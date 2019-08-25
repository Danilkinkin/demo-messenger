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
	}
});

function MessagePreview(props) {
	const classes = makeStyles(styles)();

	return (
		<ListItem alignItems="flex-start" button  onClick={props.onClick} selected={props.selected}>
	        <ListItemAvatar>
	          <Avatar alt="Remy Sharp" aria-label="recipe">{props.name[0]}</Avatar>
	        </ListItemAvatar>
	        <ListItemText
	          classes={{ primary: classes.headerDialog }}
	          primary={
	          	<React.Fragment>
	          	  {props.name}
	              <Typography
	                component="span"
	                variant="body2"
	                className={ classes.timeDialog }
	                color="textPrimary"
	              >
	                {props.message.time.getHours()+":"+props.message.time.getMinutes()}
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
	              {" — "+(props.message.text.length > 110? props.message.text.substring(0, 110) + "..." : props.message.text)}
	            </React.Fragment>
	          }
	        />
	      </ListItem>
	)
}

class Chats extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			dialogs: props.dialogs
		}
		this.handleSelect = props.onSelect;
		this.onSelect = this.handleSelectDialog.bind(this);
	}

	handleSelectDialog(e) {
		if(this.handleSelect) this.handleSelect(e);
	}

	render(){
		const { classes } = this.props;

		let list = null;
		if(this.state.dialogs.length == 0){
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
	  				this.state.dialogs.map((dialog, i) =>
						<React.Fragment key={i}>
			  				<MessagePreview 
			  					name={dialog.chanel}
			  					message={dialog.lastMessage}
			  					onClick={e => this.onSelect(i)}
			  					selected={this.state.select === i}
			  				/>
			  				{(i != this.state.dialogs.length-1)? <Divider variant="inset" component="li" /> : null}		  			
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

export default withStyles(styles)(Chats);
