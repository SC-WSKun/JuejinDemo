/*
 * @Author: your name
 * @Date: 2021-08-01 12:30:32
 * @LastEditTime: 2021-10-28 16:27:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \juejin_demo\src\index.js
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./components/Main";
import Article from "./components/Article";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/Header";

const customHistory = createBrowserHistory();
ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Route exact path="/" component={Main}></Route>
      <Route path="/article" component={Article}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
