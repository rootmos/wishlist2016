import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

class WishEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wish: props.wish};
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  render() {
    return (
      <FormGroup controlId="wishEditor">
        <FormControl
          type="text"
          value={this.state.wish.title}
          onChange={this.handleTitleChange}
          placeholder="Enter title"/>
      </FormGroup>
    )
  }

  handleTitleChange(e) {
    let newTitle = e.target.value;
    this.setState((state) => {
      state.wish.title = newTitle;
      return state}
    );

    this.propagateChange()
  }


  propagateChange() {
    if(this.props.onWishChange)
      this.props.onWishChange(this.state.wish)
  }
}

export default WishEditor;
