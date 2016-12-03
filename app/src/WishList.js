import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroupItem';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class WishList extends React.Component {
    render() {
        return <ListGroup>{this.props.wishes.map(this.renderWish)}</ListGroup>
    }

    renderWish(wish) {
        return <ListGroupItem key={wish.id}>{wish.title}</ListGroupItem>
    }
}

export default WishList;

