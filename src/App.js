import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home.jsx';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Provider } from "react-redux";
import store from "./redux/store";


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