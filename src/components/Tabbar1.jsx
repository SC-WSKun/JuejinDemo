import React from "react";
import Tabbar2 from "./Tabbar2";
import { Link } from "react-router-dom";
import * as api from "../fake-api/index";
export default class Tabbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCategories: [],
      tabSwitch: props.tabSwitch,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tabSwitch !== this.props.tabSwitch) {
      this.setState({
        tabSwitch: nextProps.tabSwitch,
      });
      api.getCategories().then((res) => {
        console.log(nextProps);
        let temp = [];
        res.data.categories.forEach((item, index) => {
          let route = "/" + item.category_name;
          temp.push(
            <div
              className={1 === nextProps.tabSwitch[index] ? "tab1Choose" : "tab1"}
              onClick={() => this.props.changeTab1(index)}
            >
              {item.category_name}
            </div>
          );
        });
        this.setState({
          addCategories: temp,
        });
      });
    }
  }
  async componentWillMount() {
    const that = this;
    await api.getCategories().then((res) => {
      console.log("all_categories", res);
      let temp = [];
      let temp_state = new Array(res.data.categories.length).fill(0);
      temp_state[0]=1;
      res.data.categories.forEach((item, index) => {
        let route = "/" + item.category_name;
        temp.push(
          <div
          className={1 === temp_state[index] ? "tab1Choose" : "tab1"}
            onClick={() => this.props.changeTab1(index)}
          >
            {item.category_name}
          </div>
        );
      });
      this.setState({
        addCategories: temp,
      });
      console.log(temp);
    });
  }
  render() {
    const { tabSwitch } = this.state;
    return (
      <div className="tabbar">
        <div className="tabbar1">
          {/* <Link
            to="/"
            className={this.state.tabSwitch[0] ? "tab1Choose" : "tab1"}
            onClick={()=>this.changeTab(0)}
          >
            推荐
          </Link>
          <Link
          to="/qianduan"
            className={this.state.tabSwitch[1] ? "tab1Choose" : "tab1"}
            onClick={()=>this.changeTab(1)}
          >
            前端
          </Link>
          <Link
            to="/houduan"
            className={this.state.tabSwitch[2] ? "tab1Choose" : "tab1"}
            onClick={()=>this.changeTab(2)}
          >
            后端
          </Link> */}
          {this.state.addCategories}
        </div>
      </div>
    );
  }
}
