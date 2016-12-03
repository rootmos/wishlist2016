import React from 'react';

class Container extends React.Component {
  render() {
    return React.cloneElement(this.props.children, {
      auth: this.props.route.auth
    })
  }
}

export default Container;
