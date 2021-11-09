import React from "react";
import "../css/Article.css"
import like from "../static/like.png"
import liked from "../static/点赞choose.png"
import comment from "../static/评论.png"
import collect from "../static/收藏.png"
export default class ArticleFooter extends React.Component{
    state={
        if_like:false
    }
    liking = ()=>{
        this.setState({
            if_like:!this.state.if_like
        })
    }
    render(){
        return(
            <div className="Footer">
                <div className="FooterItem" onClick={this.liking}>
                    <img className="FooterImg" src={this.state.if_like?liked:like} alt=" "></img>
                    <div className="FooterContent"><div>{this.props.like}</div></div>
                </div>
                <div style={{color:"rgba(162,162,162,0.6)"}}>|</div>
                <div className="FooterItem" onClick={()=>this.props.goToComment("comment")}>
                    <img className="FooterImg" src={comment} style={{position:"relative",bottom:"-3px"}} alt=" "></img>
                    <div className="FooterContent"><div>{this.props.comment}</div></div>
                </div>
                <div style={{color:"rgba(162,162,162,0.6)"}}>|</div>
                <div className="FooterItem">
                    <img className="FooterImg" src={collect} alt=" "></img>
                    <div className="FooterContent"><div>{this.props.collect}</div></div>
                </div>
            </div>
        )
    }
}