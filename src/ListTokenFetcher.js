import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

class ListTokenFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.dismiss = this.dismiss.bind(this);
    this.show = this.show.bind(this);
  }

  render() {
    if (this.state.visible) {
      return (
        <Alert onDismiss={this.dismiss}>
          <Button bsStyle="link" href={this.props.location.pathname + "/" + this.state.token}>Copy this link!</Button>
          <Button onClick={this.dismiss}>Hide</Button>
        </Alert>
      )
    } else {
      return <Button onClick={this.show}>Fetch wishlist link</Button>
    }
  }

  dismiss() {
    this.setState({visible: false});
  }

  show() {
    if(this.state.token) {
      this.setState({visible: true})
    } else {
      fetch("/api/wishlist-token", {
        headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
      }).then(x => {
        if (x.status === 200) {
          x.json().then(j => {
            this.setState({visible: true, token: j.token})
          })
        }
      });
    }
  }
}

export default ListTokenFetcher;
