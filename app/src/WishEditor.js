import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Button from 'react-bootstrap/lib/Button';
import uuidV4 from 'uuid/v4';
import Wish from './Wish.js';

class WishEditor extends React.Component {
    constructor(props) {
        super(props);

        if (props.wish) {
            this.state = {action: "Edit", wish: props.wish};
        } else {
            this.state = {action: "Add", wish: new Wish(uuidV4(), "")};
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    render() {
        return (
          <form onSubmit={this.handleSave}>
            <FormGroup controlId="wishEditor">
              <ControlLabel>{this.state.action} wish ({this.state.wish.id})</ControlLabel>
              <FormControl
                type="text"
                value={this.state.wish.title}
                onChange={this.handleTitleChange}
                placeholder="Enter title"/>
              <Button bsStyle="primary" type="submit">Save</Button>
            </FormGroup>
          </form>
          )
    }

    handleSave(e) {
        e.preventDefault();
        this.props.upsert(this.state.wish);
    }

    handleTitleChange(e) {
        let newTitle = e.target.value
        this.setState((state) => {
            state.wish.title = newTitle;
            return state}
        );
    }
}

export default WishEditor;
