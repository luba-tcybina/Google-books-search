import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Book from "../Book";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import * as api from "../../services/api";
const styles = theme => ({});

const fakeBook = {
  authors: ["Suzanne Collins"],
  description:
    "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
  image:
    "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
  link:
    "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
  title: "The Hunger Games"
};
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      searchedBooks: null
    };
  }

  handleInput = e => {
    this.setState({ keyword: e.target.value });
  };

  handleSearch = async () => {
    if (!this.state.keyword) return;
    const result = await api.getBooksFromGoogle(this.state.keyword);
    this.setState({ searchedBooks: result });
  };

  render() {
    const { classes } = this.props;
    const { keyword, searchedBooks } = this.state;
    return (
      <div style={{ margin: 20 }}>
        <div>
          <h2>Book Search</h2>
          <TextField
            id="search"
            label=""
            placeholder="Type Book Name"
            className={classes.textField}
            margin="normal"
            value={keyword}
            fullWidth
            onChange={this.handleInput}
          />
          <Box display="flex" justifyContent="flex-end" m={1}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={this.handleSearch}
            >
              Search
            </Button>
          </Box>
        </div>

        <div>
          <h2>Result</h2>
          {!searchedBooks &&
            <p>No result</p>
          }
          {searchedBooks &&
            searchedBooks.map((item, index) => {
              return(
              <Book type="search" bookInfo={item} key={index}/>
              )
            })}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Search);
