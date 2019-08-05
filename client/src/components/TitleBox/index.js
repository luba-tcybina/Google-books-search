import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Link } from "react-router-dom";
import { Button, Box } from "@material-ui/core";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  
});

class TitleBox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" m={2}>
          <h1>(React) Google Books Search</h1>
          <p>Search for and Save Books of Interest</p>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(TitleBox);
