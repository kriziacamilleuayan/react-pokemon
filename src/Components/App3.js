import React, { Component } from 'react';

export default React.createClass ({

  render() {
    return (

      <div>
        <h1>Comments <small>on {this.props.pokeName}</small></h1>
        <div className="commentsSection">
          <div>
            <div>
                {this.props.commentBody.body
                  .filter((objComment) => {return objComment.author === this.props.pokeName})
                  .map((i) => {return (
                                <div className="itemComment">
                                  <p className="no-margin">"{i.text}"</p>
                                  <p className="right">-{i.id}</p>
                                </div>)
                              })
                }
                 {this.props.items.map(item => (
                    <div className="itemComment">
                      <p className="no-margin" key={item.id}>"{item.text}"</p>
                      <p className="right">-{item.id}</p>
                    </div>
                ))}
            </div>
                 
          </div>
        </div>
        <form onSubmit={this.props.handleComment}>
          <textarea className="textarea" onChange={this.props.onChange} value={this.props.text} rows="4"/>
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