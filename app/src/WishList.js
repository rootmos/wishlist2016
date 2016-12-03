import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroupItem';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class WishList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wishes: props.wishes};
    }

    render() {
        return <ListGroup>{this.state.wishes.map(this.renderWish)}</ListGroup>;
    }

    renderWish(wish) {
        return <ListGroupItem key={wish.id}>{wish.title}</ListGroupItem>
    }
}

export default WishList;

