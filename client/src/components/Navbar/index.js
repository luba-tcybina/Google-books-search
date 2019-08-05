import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavLink, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "black",
    zIndex: theme.zIndex.drawer + 1
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Button
              variant="text"
              color="primary"
              className={classes.button}
              size="large"
            >
              <NavLink to="/" style={{textDecoration:'none'}}>Google Books</NavLink>
            </Button>
            <Button
              variant="text"
              color="primary"
              className={classes.button}
            >
              <NavLink to="/search" style={{textDecoration:'none'}}>Search</NavLink>
            </Button>

            <Button
              variant="text"
              color="primary"
              className={classes.button}
            >
              <NavLink to="/saved" style={{textDecoration:'none'}}>Saved</NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
