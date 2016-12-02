import React from 'react';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

function Wish(props) {
    return <ListGroupItem>{props.title}</ListGroupItem>;
}

export default Wish;
