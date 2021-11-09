import React, { createRef } from "react";
import * as api from "../fake-api/index";
export default class Section extends React.Component {
  tabbar2 = [
    { title: "热门", category: "hot" },
    { title: "最新", category: "hot" },
  ];
  async componentWillMount() {
    await api.getArticles().then((res) => {
      console.log(res);
      let temp = [];
      res.data.articles.forEach((item) => {
        temp.push(
          <div className="sectionItem">
            <div className="ItemTopBox">
              <div className="author">{item.author_user_info.user_name}</div>
              <div className="divide">|</div>
              <div className="createDate">天前</div>
            </div>
            <div className="ItemBottomBox">
              <div className="sectionMsgBox">
                <div className="sectionTitle">{item.article_info.title}</div>
                <div className="sectionBrief">
                  {item.article_info.brief_content}
                </div>
              </div>
              <img
                className="sectionImg"
                src={item.article_info.cover_image}
                alt=" "
              ></img>
            </div>
          </div>
        );
      });
      this.setState({
        addElement: temp,
      });
      console.log(this.state.addElement);
    });
  }
  componentDidMount() {
    if (this.scroll) {
      this.scroll.addEventListener("scroll", this.handleScroll,false);
    }
  }
  componentWillUnmount() {
    this.scroll.removeEventListener("scroll", this.handleScroll,false);
  }
  handleScroll = (e) => {
    const { clientHeight, scrollHeight, scrollTop } = e.target;
    const isBottom = scrollTop + clientHeight + 20 > scrollHeight;
    console.log(scrollTop, clientHeight, scrollHeight, isBottom);
    if (isBottom) {
      this.scroll.removeEventListener("scroll", this.handleScroll,false);
      this.props.reachBottom();
      setTimeout(() => {
        this.scroll.addEventListener("scroll", this.handleScroll,false);
      }, 300);
    }
  };
  render() {
    return (
      <div
        ref={(e) => {
          this.scroll = e;
        }}
        className="content"
      >
        <div className="tabbar2">
          <div
            className="tabbar2Item"
            onClick={() => {
              this.props.changeTab2("hot");
            }}
          >
            热门
          </div>
          <div
            style={{
              position: "relative",
              top: "-3px",
              color: "rgb(226, 226, 226)",
              "margin-left": "6px",
              "margin-right": "6px",
              height: "20px",
              "line-height": "20px",
              "text-align": "center",
              "align-items": "center",
            }}
          >
            |
          </div>
          <div
            className="tabbar2Item"
            onClick={() => {
              this.props.changeTab2("new");
            }}
          >
            最新
          </div>
        </div>
        {this.props.contentList}
      </div>
    );
  }
}
