import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import * as api from "../../services/api";
import { NotificationManager } from "react-notifications";

const styles = theme => ({
  book: {
    border: "3px solid #333",
    // boxShadow: "0 0 20px #f3f3f3",
    padding: 10,
    margin: 5
  },
  button: {
    marginLeft: 5
  }
});

class Book extends Component {
  handleOpen = () => {
    window.open(this.props.bookInfo.link);
  };

  handleSave = async bookInfo => {
    const result = await api.saveBook(bookInfo);
    if (result) NotificationManager.success("Saved");
    else NotificationManager.error("Failed to save");
  };

  handleDelete = async bookInfo => {
    const result = await api.deleteBook(bookInfo);
    if (result) {
      this.props.onDelete(bookInfo._id);
      NotificationManager.success("Deleted")
    }
    else{
      NotificationManager.error("Failed")
    }
  };

  render() {
    const { classes, type } = this.props;
    const { title, authors, description, image, link } = this.props.bookInfo;
    return (
      <div className={classes.book}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexGrow: 1 }}>{title}</strong>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={this.handleOpen}
          >
            View
          </Button>
          {type === "search" && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => this.handleSave(this.props.bookInfo)}
            >
              Save
            </Button>
          )}
          {type === "saved" && (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() => this.handleDelete(this.props.bookInfo)}
            >
              Delete
            </Button>
          )}
        </div>
        {authors && (
          <div style={{ marginBottom: 5 }}>written by {authors.join(", ")}</div>
        )}
        <div style={{ display: "flex" }}>
          <img
            style={{ height: 200 }}
            src={image}
            alt="image"
            onClick={this.handleOpen}
          />
          <p style={{ marginLeft: 10, marginTop: 0 }}>{description}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Book);
