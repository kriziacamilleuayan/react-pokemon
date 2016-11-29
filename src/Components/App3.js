import React, { Component } from 'react';

export default React.createClass ({

  render() {
    return (
      <div>
        <h1>Comments</h1>
        <h3>on {this.props.pokeName}</h3>
        <div className="commentsSection">
          <div>
            <div>{this.props.commentBody.body.filter((objComment) => {return objComment.author === this.props.pokeName}).map((i) => {return <p className="itemComment">{i.text}</p>})}</div>
                {this.props.items.map(item => (
                  <p key={item.id} className="itemComment">{item.text}</p>
                ))}
          </div>
        </div>
        <form onSubmit={this.props.handleComment}>
          <textarea className="textarea" onChange={this.props.onChange} value={this.props.text}/>
          <button className="btn btn-default">Comment</button>
        </form>
      </div>
    );
  }
}

  // render() {
  //   // console.log(this.props)
  //   // var comments = this.props.commentBody.body.filter((commentBody) => {return commentBody.author === this.props.pokeName}).map((i) => {return <p>{i.text}</p>});
  //   return (
  //     <div  className="app3">
  //       <div className="col-sm-4">
  //         <div className="container-fluid">
  //           <h1>Comments</h1>
  //           <div className="commentsSection">
  //             <div>{this.props.commentBody.body.filter((objComment) => {return objComment.author === this.props.pokeName}).map((i) => {return <p className="itemComment">{i.text}</p>})}</div>
  //           </div>
  //           <form onSubmit={this.props.handleComment} >
  //             <textarea className="textarea" onChange={this.props.onChange} />
  //             <button  className="btn btn-default">Comment</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //     );
  //   }

  )

// class CommentList extends React.Component {
//   render() {
//     return (

//     );
//   }
// }