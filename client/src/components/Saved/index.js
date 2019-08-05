import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Book from "../Book";
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
class Saved extends Component {
  constructor(props) {
    super(props);

    this.state = {
      savedBooks: null
    };
  }

  async componentDidMount() {
    const savedBooks = await api.getSavedBooks();
    if (!savedBooks) {
      console.log("No savedBooks");
      return;
    }
    this.setState({ savedBooks: savedBooks });
  }

  handleDeleted = id => {
    const newArray = this.state.savedBooks.filter(item => {
      return item._id !== id;
    });
    this.setState({ savedBooks: newArray });
  };

  render() {
    const { savedBooks } = this.state;
    return (
      <div style={{ margin: 20 }}>
        <h2>Saved Books</h2>
        {!savedBooks ||
          (savedBooks && savedBooks.length === 0 && <p>No Saved Books.</p>)}
        {savedBooks &&
          savedBooks.map((item, index) => {
            return (
              <Book
                type="saved"
                bookInfo={item}
                key={index}
                onDelete={this.handleDeleted}
              />
            );
          })}
      </div>
    );
  }
}

export default withStyles(styles)(Saved);
