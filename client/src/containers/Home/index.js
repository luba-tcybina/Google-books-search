import React, { Component } from "react";
import Saved from "../../components/Saved";
import Search from "../../components/Search";
import NavBar from "../../components/Navbar";
import Titlebox from "../../components/TitleBox"
import { Route, BrowserRouter } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <Titlebox />
        <div className="content">
          <Route exact path="/search" component={Search} />
          <Route path="/saved" component={Saved} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
