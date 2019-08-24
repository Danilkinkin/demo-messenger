import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
	Paper,
	IconButton,
	InputBase,
	Divider
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		maxWidth: 600,
		margin: "auto",
		width: "100%"
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1,
	},
	iconButton: {
		padding: 10,
		marginTop: "auto"
	},
	divider: {
		height: 28,
		margin: "8px 4px",
		marginTop: "auto"
	}
});

class MessageInput extends React.Component {
	constructor(props){
		super(props);

		this.state = {

		}
	}

	render(){
		const { classes } = this.props;

		return (
	  		<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder="Введите сообщение"
					multiline
					inputProps={{ 'aria-label': 'Введите ваше сообщение' }}
				/>
				<Divider className={classes.divider} orientation="vertical" />
				<IconButton color="primary" className={classes.iconButton} aria-label="send">
					<SendIcon />
				</IconButton>
			</Paper>
		);
	}
}


MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageInput);
