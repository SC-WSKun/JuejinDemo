import React from "react";
import Header from "./Header";
import * as api from "../fake-api/index";
import "../css/Article.css";
import ArticleFooter from "./AricleFooter";
import Comment from "./Comment";
import like from "../static/like.png"
import liked from "../static/点赞choose.png"
import commentImg from "../static/评论.png"
import moment from "moment";
export default class Article extends React.Component {
  state = {
    title: [],
    content: [],
    img: "",
    author: [],
    comment: [],
    commentList: [],
    offset:0,
    comment_end:null
  };
 
  componentDidMount() {
    if (this.scroll) {
      this.scroll.addEventListener("scroll", this.handleScroll,false);
    }
    this.getComment();
    this.setState({
        offset:this.state.offset+10
    })
    api.getArticleById(this.props.location.query.id).then((res) => {
      let temp = [];
      let temp1 = [];
      let temp_author = [];
      console.log(res);
      temp = (
        <div
          dangerouslySetInnerHTML={{ __html: res.data.article.article_content }}
        ></div>
      );
      temp1 = (
        <div
          dangerouslySetInnerHTML={{
            __html: res.data.article.article_info.title,
          }}
        ></div>
      );
      temp_author = (
        <div className="authorBox">
          <img
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={res.data.article.author_user_info.avatar_large}
            alt=""
          />
          <div style={{ marginLeft: "10px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>
              {res.data.article.author_user_info.user_name}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "rgb(162,162,162)",
                whiteSpace: "pre",
              }}
            >
              {moment(
                parseInt(res.data.article.article_info.ctime) * 1000
              ).format("YYYY年MM月DD日")}
              {"   "}
              阅读 {res.data.article.article_info.view_count}
            </div>
          </div>
          <div
            style={{
              border: "1px solid green",
              borderRadius: "2px",
              width: "60px",
              padding: "2px",
              fontSize: "12px",
              color: "green",
              textAlign: "center",
              marginLeft: "100px",
            }}
          >
            关注+
          </div>
        </div>
      );
      this.setState({
        content: temp,
        title: temp1,
        img: res.data.article.article_info.cover_image,
        author: temp_author,
        like: res.data.article.article_info.digg_count,
        comment: res.data.article.article_info.comment_count,
        collect: res.data.article.article_info.collect_count,
      });
    });
  }
  handleScroll = (e) => {
      const that =this;
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
    if (isBottom) {
      this.scroll.removeEventListener("scroll", this.handleScroll, false);
      this.getComment();
      this.setState({
          offset:this.state.offset+10
      })
      setTimeout(() => {
        that.scroll.addEventListener("scroll", this.handleScroll, false);
      }, 300);
    }
  };
  getComment=()=>{
      console.log(this.state.offset)
    api.getCommentsByArticleId(this.props.id,this.state.offset).then((res) => {
        console.log(res)
        if(!res.has_more){
            this.setState({
                comment_end:(<div className="end">没有更多了</div>)
            })
            return;
        }
        let comment = this.state.commentList;
        let temp = [...comment];
        res.data.comments.forEach((item) => {
          temp.push(
            <div className="commentItem">
              <img src={item.user_info.avatar_large} alt="" />
              <div style={{ marginLeft: "10px" }}>
                <div style={{ display: "flex" }}>
                  <div className="author">{item.user_info.user_name}</div>
                  <div
                    style={{
                      color: "rgb(226, 226, 226)",
                      marginLeft: "6px",
                      height: "20px",
                      textAlign: "center",
                    }}
                  >
                    |
                  </div>
                  <div className="createDate">
                    {parseInt(
                      (moment() - parseInt(item.comment_info.ctime) * 1000) /
                        (24 * 3600000)
                    )}
                    天前
                  </div>
                </div>
                <div className="commentContent">
                  {item.comment_info.comment_content}
                </div>
                <div className="operateBox">
                  <div className="operate">
                    <img className="operateImg" src={like} alt=" " />
                    <div className="operateText">点赞</div>
                  </div>
                  <div className="operate">
                    <img className="operateImg" src={commentImg} alt=" " />
                    <div className="operateText">回复</div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
        this.setState({
          commentList: temp,
        });
      });
  };
  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  };
  componentWillUnmount() {
    this.scroll.removeEventListener("scroll", this.handleScroll, false);
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div ref = {(e)=>{
            this.scroll = e;
        }} className="content">
          <div
            style={{
              marginTop: "20px",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            {this.state.author}
            <img className="artImg" src={this.state.img} alt="" />
            <div className="artTitle">{this.state.title}</div>
            <div>{this.state.content}</div>
          </div>
          <Comment commentList={this.state.commentList}></Comment>
          {this.state.comment_end}
        </div>
        <ArticleFooter
          like={this.state.like}
          comment={this.state.comment}
          goToComment={this.scrollToAnchor}
          collect={this.state.collect}
        ></ArticleFooter>
      </div>
    );
  }
}
