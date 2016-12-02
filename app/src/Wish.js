import React from 'react';
import Button from 'react-bootstrap/lib/Button';

function Wish(props) {
    return <Button bsStyle="primary" onClick={() => alert(`Clicked on ${props.title}`)}>{props.title}</Button>;
}

export default Wish;
