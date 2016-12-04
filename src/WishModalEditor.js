import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import WishEditor from './WishEditor.js';

function initialState(props) {
  if (props.wish) {
    return {active: true, wish: undefined}
  } else {
    return {active: false, wish: undefined}
  }
}

class WishModalEditor extends React.Component {

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = initialState(props)
  }

  close() {
    this.setState({active: false});
  }

  save() {
    if(this.props.upsertWish && this.state.wish)
      this.props.upsertWish(this.state.wish)
    this.close();
  }

  handleChange(wish) {
    this.setState({wish: wish})
  }

  componentWillReceiveProps(nextProps) {
    this.setState(initialState(nextProps))
  }

  render() {
    return (
      <Modal show={this.state.active} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Add/edit wish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WishEditor wish={this.props.wish} onWishChange={this.handleChange}/>
        </Modal.Body>
        <Modal.Footer>
          <ButtonToolbar>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.save}>Save</Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default WishModalEditor;
