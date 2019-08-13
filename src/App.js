import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Map from "./components/Map";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Map} />
    </BrowserRouter>
  );
};

export default App;
