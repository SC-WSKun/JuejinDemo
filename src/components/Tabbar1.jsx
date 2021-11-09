import React from "react";
import Tabbar2 from "./Tabbar2";
import {Link} from "react-router-dom";
import * as api from "../fake-api/index"
export default class Tabbar1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSwitch: [],
      addCategories: []
    };
  }
  async componentWillMount(){
      const that = this;
    await api.getCategories().then(res=>{
        console.log("all_categories",res);
        let temp = [];
        res.data.categories.forEach((item,index)=>{
            let temp_switch = that.state.tabSwitch
            temp_switch.push(0)
            that.setState({
                tabSwitch: temp_switch
            })
            let route = "/"+item.category_name
            temp.push(
                <div
                className={this.state.tabSwitch[index] ? "tab1Choose" : "tab1"}
                onClick={()=>this.props.changeTab1(index)}
              >
                {item.category_name}
              </div>
            )
        })
        let temp_switch = that.state.tabSwitch;
        temp_switch[0]=1;
        this.setState({
            tabSwitch:temp_switch,
            addCategories:temp
        })
        console.log(temp)
    })
  }
  changeTab=(i)=>{
    console.log(i)
    let temp_switch = new Array(this.state.tabSwitch.length).fill(0);
    temp_switch[i]=1;
    this.setState({
        tabSwitch:temp_switch
    })
  };
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
