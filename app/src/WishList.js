import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroupItem';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.renderWish = this.renderWish.bind(this);
  }
  render() {
    return <ListGroup>{[...this.props.wishes].map(this.renderWish)}</ListGroup>
  }

  renderWish(wish) {
    return <ListGroupItem key={wish.id} onClick={() => this.props.editWish(wish)}>{wish.title}</ListGroupItem>
  }
}

export default WishList;

