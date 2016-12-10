import React from 'react';

import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';

class Comment {
  constructor(cid, from, body, time) {
    this.cid = cid;
    this.from = from;
    this.body = body;
    this.time = time;
  }
}

class CommentSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {newComment: "", comments: []};
    this.postComment = this.postComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.comments.map(this.renderComment)}
        </ListGroup>
        <FormGroup>
          <FormControl componentClass="textarea" placeholder="Add comment..." onChange={this.handleCommentChange} value={this.state.newComment}/>
          <Button bsStyle="primary" type="submit" onClick={this.postComment}>Submit</Button>
        </FormGroup>
      </div>
    )
  }

  renderComment(c) {
    let name = this.lookupUser(this.props.follows, c.from).name
    return (<ListGroupItem key={c.cid}>{c.body} (by {name} at {c.time})</ListGroupItem>);
  }

  postComment() {
    if (this.state.newComment) {
      let body = { body: this.state.newComment }
      if (this.props.token) {
        body.token = this.props.token;
      }

      fetch(`/api/wish/${this.props.wid}/comment`, {
        headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`},
        method: 'POST',
        body: JSON.stringify(body)
      }).then(x => {
        if (x.status === 201) {
          this.setState({newComment: ""});
          this.fetchComments();
        }
      });
    }
  }

  handleCommentChange(e) {
    let newValue = e.target.value;
    this.setState({newComment: newValue});
  }

  fetchComments() {
    let fetchUrl = `/api/wish/${this.props.wid}/comments`;
    if(this.props.token) {
      fetchUrl += "?friend=" + this.props.token
    }

    fetch(fetchUrl, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
    }).then(x => {
      if (x.status === 200) {
        x.json().then(cs => {
          let comments = cs.map(c => new Comment(c.cid, c.from, c.body, c.time));
          this.setState({comments: comments})
        })
      }
    });
  }

  lookupUser(follows, uid) {
    if (uid === this.props.auth.getUserId()) {
      return {name: "me"};
    } else {
      for(let f of follows.values()) {
        if(f.uid === uid)
          return f
      }
    }

    return {name: "anonymous"}
  }
}

export default CommentSection;
