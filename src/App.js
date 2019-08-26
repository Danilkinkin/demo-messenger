import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import { Provider } from "react-redux";
import openSocket from 'socket.io-client'
import store from "./redux/store";
const loremIpsum = require('lorem-ipsum').loremIpsum;

import PropTypes from 'prop-types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';

import Home from './Home.jsx';

// FIXME CRITICAL Global variables are prohibited to use with SSR.
let init = true;
let id = 0;
const roomIds = ['Rick Sanchez', 'Morty Smith', 'Dipper Pines', 'Mabel Pines', 'Spongebob Squarepants'];
const channelIds = ['VK', 'OK', 'FB'];

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

//const socket = openSocket('http://localhost:3000/')

class App extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){

		//Генерация сообщений с сервара

		/*socket.on("on_message", data => {
			data.ts = new Date(data.ts);
			store.dispatch({type:"PUSH_MESSAGE", payload:data})
		})*/

		//Эмуляция сообщений с сервара
		emit();

		function emit() {
		      if (init) {
		          init = false;
		      } else {
		          handle({
		              id: ++id,
		              roomId: randomChoose(roomIds),
		              channelId: randomChoose(channelIds),
		              body: loremIpsum({
		                  count: randomBetween(1, 5),
		                  format: 'plain',
		                  units: randomChoose(['sentences', 'words']),
		              }),
		              ts: new Date(),
		          });
		      }
		      // FIXME Timeouts must be cleared according to React component lifecycle.
			  //  CRITICAL There is a memory leak: sometimes messages appear much more frequently than expected.
		      setTimeout(emit, randomBetween(1500, 4000));
		}

		function handle(message) {
			store.dispatch({type:"PUSH_MESSAGE", payload:message})
		}
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

export function preferTime(time){
	let h = time.getHours();
	let m = time.getMinutes();

	return h+":"+(m<10? "0" : "")+m;
}

function randomBetween(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
}

function randomChoose(array) {
    return array[randomBetween(0, array.length - 1)];
}
