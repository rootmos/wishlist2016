import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { getSub } from './utils/JwtHelpers.js';
import uuidV4 from 'uuid/v4';

class FollowButton extends React.Component {
  constructor(props) {
    super(props);

    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
  }

  render() {
    if(this.props.friendToken) {
      let isSomeoneElse = !this.props.auth.isMe(this.props.friendToken);
      if(isSomeoneElse) {
        let uid = getSub(this.props.friendToken);

        for (var f of this.props.follows) {
          if (f.uid === uid) {
            this.fid = f.id;
            return <Button onClick={this.unfollow}>Unfollow</Button>;
          }
        }

        return <Button onClick={this.follow}>Follow</Button>;
      }
    }

    return <div />;
  }

  follow() {
    fetch("/api/user/follows/" + uuidV4(), {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`},
      method: 'PUT',
      body: JSON.stringify({
        token: this.props.friendToken
      })
    }).then(x => {
      if (x.status === 202) {
        this.props.onFollowChange();
      }
    });
  }

  unfollow() {
    fetch("/api/user/follows/" + this.fid, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`},
      method: 'DELETE'
    }).then(x => {
      if (x.status === 202) {
        this.props.onFollowChange();
      }
    });
  }
}

export default FollowButton;
