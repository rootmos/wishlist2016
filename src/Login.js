import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class Login extends React.Component {
  render() {
    return <Button bsStyle="primary" onClick={() => this.props.auth.show()}>Login</Button>
  }
}

export default Login;
