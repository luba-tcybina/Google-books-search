import React from "react";
import { BrowserRouter, Route, HashRouter } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Home from "./containers/Home";
import "react-notifications/lib/notifications.css";
import "./App.css";

function App() {
  return (
      <BrowserRouter >
        <Route path="/" exact  component={Home} />
        <NotificationContainer />
      </BrowserRouter>
  );
}


export default App;
