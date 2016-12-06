import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class FollowsList extends React.Component {
  render() {
    if(this.props.follows.size > 0 || this.props.isSomeoneElse) {
      return (
        <ListGroup>
          <ListGroupItem key="me" href="/app">My list</ListGroupItem>
          {[...this.props.follows.values()].map(this.renderFollow)}
        </ListGroup>
      )
    }

    return <div />
  }

  renderFollow(f) {
    return <ListGroupItem key={f.id} href={"/app/" + f.token}>{f.name}</ListGroupItem>
  }
}

export default FollowsList;
