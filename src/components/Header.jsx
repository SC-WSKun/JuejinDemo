import React from "react";
import { Link } from "react-router-dom";
import imageUrl from "../static/mood.png";
import pull from "../static/下三角形.png";
export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="backLogo" src={imageUrl} alt=" "></img>
        <Link to="/" className="back">首页</Link>
        <img src={pull} className="pullList" alt=" "></img>
        <div className="searchBar">探索稀土掘金</div>
        <div className="login">登录</div>
      </div>
    );
  }
}
