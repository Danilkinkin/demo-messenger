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
import Dexie from 'dexie';


const styles = theme => ({
  body: {
    margin: 0,
    height: "100vh"
  },
  root: {
    height: "100%"
  }
});

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
				<Home />
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
    setTimeout(emit, randomBetween(2000, 6000));
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

/*var db = new Dexie("FriendDatabase");
db.version(1).stores({
	rooms: "id,timeline, unread",

});
 
db.transaction('rw', db.friends, async() => {
 
    // Make sure we have something in DB:
    if ((await db.friends.where('name').equals('Josephine').count()) === 0) {
        let id = await db.friends.add({name: "Josephine", age: 21});
        alert (`Addded friend with id ${id}`);
    }
 
    // Query:
    let youngFriends = await db.friends.where("age").below(25).toArray();
 
    // Show result:
    alert ("My young friends: " + JSON.stringify(youngFriends));
 
}).catch(e => {
    alert(e.stack || e);
});*/