import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home.jsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from "react-redux";
import store from "./redux/store";
import { useDispatch } from 'react-redux';
import dataApp from "./dataApp.js";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import openSocket from 'socket.io-client'


let theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: purple,
  },
  status: {
    danger: 'orange',
  },
});

theme = responsiveFontSizes(theme);

const styles = theme => ({
  body: {
    margin: 0,
    height: "100vh"
  },
  root: {
    height: "100%"
  }
});

const socket = openSocket('http://localhost:3000/')

class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){		
		const { classes } = this.props;

		document.body.className = classes.body;
		document.getElementById("root").className = classes.root;

		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Home />
				</ThemeProvider>
			</Provider>
		);
	}
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

socket.on("on_message", data => {
	data.ts = new Date(data.ts);
	store.dispatch({type:"PUSH_MESSAGE", payload:data})
})

export function preferTime(time){
	let h = time.getHours();
	let m = time.getMinutes();

	return h+":"+(m<10? "0" : "")+m;
}