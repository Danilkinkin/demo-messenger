import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home.jsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from "react-redux";
import store from "./redux/store";
const loremIpsum = require('lorem-ipsum').loremIpsum;
import { useDispatch } from 'react-redux';
import dataApp from "./dataApp.js";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';


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

console.log(dataApp.unreadMessages)

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

let init = true;
let id = 0;
const roomIds = ['Rick Sanchez', 'Morty Smith', 'Dipper Pines', 'Mabel Pines', 'Spongebob Squarepants'];
const channelIds = ['VK', 'OK', 'FB'];

emit();

function emit() {
//const dispatch = useDispatch()
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
    setTimeout(emit, randomBetween(200, 600));
}

function randomBetween(min, max) {
    return Math.floor((max - min + 1) * Math.random()) + min;
}

function randomChoose(array) {
    return array[randomBetween(0, array.length - 1)];
}

function handle(message) {
    store.dispatch({type:"PUSH_MESSAGE", payload:message})
}