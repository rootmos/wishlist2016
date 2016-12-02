import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroupItem';

function WishList(props) {
    return <ListGroup>{props.wishes}</ListGroup>;
}

export default WishList;

