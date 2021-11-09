import React from "react";
import "../css/Article.css";
import * as api from "../fake-api/index";
import like from "../static/like.png"
import commentImg from "../static/评论.png"
import moment from "moment";
export default class Comment extends React.Component {
  render() {
    return (
      <div
        id="comment"
      >
        <div>全部评论</div>
        {this.props.commentList}
      </div>
    );
  }
}
