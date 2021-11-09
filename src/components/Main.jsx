import React from "react";
import Tabbar1 from "./Tabbar1";
import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../css/Main.css";
import * as api from "../fake-api/index";
export default class Main extends React.Component {
  state = {
    tab1: 0,
    tab2: "hot",
    tabSwitch:[],
    contentList: [],
    offset: 0,
  };
  componentDidMount() {
    this.updateList();
  }
  updateList = () => {
    console.log(this.state.tab1);
    console.log(this.state.tab2);
    api.getArticles(this.state.tab1, this.state.tab2).then((res) => {
      console.log(res);
      let temp = [];
      res.data.articles.forEach((item) => {
        let data = {
          id: item.article_id,
        };
        let path = {
          pathname: "/article",
          query: data,
        };
        temp.push(
          <Link to={path} className="sectionItem">
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
              ></img>
            </div>
          </Link>
        );
      });
      this.setState({
        offset: 0,
        contentList: temp,
      });
      console.log(this.state.contentList);
    });
  };
  changeTab1=async (i)=>{
    console.log(i)
    let temp_switch = new Array(this.state.tabSwitch.length).fill(0);
    temp_switch[i]=1;
    await this.setState({
        tabSwitch:temp_switch,
        tab1:i
    })
    this.updateList();
  };
  changeTab2 = async (i) => {
    console.log("this is father", i);
    await this.setState({
      tab2: i,
    });
    this.updateList();
  };
  reachBottom= ()=>{
    console.log("iiiii")
    api.getArticles(this.state.tab1, this.state.tab2,this.state.offset).then((res) => {
        console.log(res);
        let contentList = this.state.contentList;
        let temp = [...contentList]
        // let temp = this.state.contentList;
        res.data.articles.forEach((item) => {
          let data = {
            id: item.article_id,
          };
          let path = {
            pathname: "/article",
            query: data,
          };
          temp.push(
            <Link to={path} className="sectionItem">
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
            </Link>
          );
        });
        this.setState({
          offset: this.state.offset+1,
          contentList: temp,
        });
        console.log(this.state.contentList);
      });
  };
  render() {
    const { contentList } = this.state;
    return (
      <div className="mainPage">
        <Header></Header>
        <Tabbar1 changeTab1={this.changeTab1} tabSwitch={this.state.tabSwitch}></Tabbar1>
        <Section
          changeTab2={this.changeTab2}
          contentList={contentList}
          reachBottom={this.reachBottom}
        ></Section>
        <Footer></Footer>
      </div>
    );
  }
}
