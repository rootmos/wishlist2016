import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.renderWish = this.renderWish.bind(this);
  }
  render() {
    return <PanelGroup accordion>{[...this.props.wishes].map(this.renderWish)}</PanelGroup>
  }

  renderWish(wish) {
    return (
      <Panel header={wish.title} key={wish.id} eventKey={wish.id}>
        <ButtonToolbar>
          <Button onClick={() => this.props.editWish(wish)}>Edit</Button>
          <Button bsStyle="warning" onClick={() => this.props.removeWish(wish)}>Delete</Button>
        </ButtonToolbar>
      </Panel>)
  }
}

export default WishList;

