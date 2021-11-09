import React from "react";
import { Link } from "react-router-dom";
import hot from "../static/热门.png";
import collection from "../static/213收藏.png";
import history from "../static/bg-history.png";
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseTab: [1, 0, 0],
    };
  }
  render() {
    return (
      <div className="footer">
        <div className="footerTab">
          <img src={hot} className="footerImg" alt=" "></img>
          <Link to="/hot" className="footerTitle">
            热门
          </Link>
        </div>
        <div className="footerTab">
          <img src={history} className="footerImg" alt=" " style={{"transform":"scale(0.85)"}}></img>
          <Link to="/history" className="footerTitle">
            历史
          </Link>
        </div>
        <div className="footerTab">
          <img src={collection} className="footerImg" alt=" "></img>
          <Link to="/store" className="footerTitle">
            收藏
          </Link>
        </div>
      </div>
    );
  }
}
