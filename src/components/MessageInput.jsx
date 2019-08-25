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
import { connect } from "react-redux";
import { sendMessage } from "../redux/actions";

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
		marginTop: "auto",
		transition: ".25s cubic-bezier(0.75, 0, 0.1, 1.01)"
	},
	divider: {
		height: 28,
		margin: "8px 4px",
		marginTop: "auto",
		transition: ".25s cubic-bezier(0.75, 0, 0.1, 1.01)"
	},
	hidden: {
		opacity: 0,
		pointerEvents: "none",
		transform: "scale(.8)"
	}
});

class MessageInput extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			message: ""
		}

		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handlePrintMessage = this.handlePrintMessage.bind(this);
		this.handleCtrlEnter = this.handleCtrlEnter.bind(this);
	}

	handleSendMessage() {
		this.props.sendMessage(this.state.message);
		this.state.message = "";
		document.getElementById("input-message").value = "";
		this.setState(this.state);
	}

	handlePrintMessage(e) {
		this.state.message = e.target.value;
		this.setState(this.state);
	}

	handleCtrlEnter(e) {
		if(e.ctrlKey && e.keyCode == 13) this.handleSendMessage();
	}

	render(){
		const { classes } = this.props;

		let helperHidden = this.state.message.length > 0? "" : classes.hidden;

		return (
	  		<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder="Введите сообщение"
					multiline
					inputProps={{
						'aria-label': 'Введите ваше сообщение',
						'id': "input-message",
						'onKeyDown': this.handleCtrlEnter
					}}
					onChange={this.handlePrintMessage}
				/>
				<Divider className={classes.divider+" "+helperHidden} orientation="vertical" />
				<IconButton color="primary" className={classes.iconButton+" "+helperHidden} aria-label="send" onClick={this.handleSendMessage}>
					<SendIcon />
				</IconButton>
			</Paper>
		);
	}
}


MessageInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  state => state,
  { sendMessage }
)(withStyles(styles)(MessageInput));
