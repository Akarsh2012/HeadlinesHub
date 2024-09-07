
import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import NewsComponent from "./Components/NewsComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 8;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        {" "}
        {/* Use a valid HTML element as the root element */}
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            progress={this.state.progress}
            
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="Home"
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                  pageTitle="Home-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="business"
                  pageSize={this.pageSize}
                  country="us"
                  category="business"
                  pageTitle="Business-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
                  country="us"
                  category="entertainment"
                  pageTitle="Entertainment-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/general"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
                  country="us"
                  category="general"
                  pageTitle="General-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="health"
                  pageSize={this.pageSize}
                  country="us"
                  category="health"
                  pageTitle="Health-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="science"
                  pageSize={this.pageSize}
                  country="us"
                  category="science"
                  pageTitle="Science-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="sports"
                  pageSize={this.pageSize}
                  country="us"
                  category="sports"
                  pageTitle="Sports-HeadlinesHub"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <NewsComponent setProgress={this.setProgress}
                  key="technology"
                  pageSize={this.pageSize}
                  country="us"
                  category="technology"
                  pageTitle="Technology-HeadlinesHub"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
