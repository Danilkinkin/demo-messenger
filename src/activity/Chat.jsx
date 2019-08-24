import React from 'react';
import MessageInput from './MessageInput.jsx';
import { LoremIpsum } from "lorem-ipsum";
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
	myMessage: {
		marginLeft: "auto",
	    backgroundColor: theme.palette.primary.main,
	    color: "#fff"
	},
	root: {
		flexGrow: 1,
	    display: "flex",
	    flexDirection: "column"
	}
});

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

class Chat extends React.Component {
	constructor(props){
		super(props);

		this.state = {

		}
	}

	render(){
		const { classes } = this.props;

		return (
	  		<Container maxWidth="md" className={classes.root}>
		        <List className={classes.messages}>
		        	<ListItem alignItems="flex-start" className={classes.message}>
				        <Typography variant="body2">
		            	{lorem.generateSentences(6)}
		          		</Typography>
					</ListItem>
					<ListItem alignItems="flex-start" className={classes.message}>
				        <Typography variant="body2">
		            	{lorem.generateWords(6)}
		          		</Typography>
					</ListItem>
					<Divider />
					<ListSubheader>VK</ListSubheader>
				    <ListItem alignItems="flex-start" className={classes.message+" "+classes.myMessage}>
				        <Typography variant="body2">
		            	{lorem.generateSentences(2)}
		          		</Typography>
					</ListItem>
					<ListItem alignItems="flex-start" className={classes.message}>
				        <Typography variant="body2">
		            	{lorem.generateSentences(3)}
		          		</Typography>
					</ListItem>
		        </List>
		        <MessageInput />
			</Container>
		);
	}
}


Chat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Chat);
