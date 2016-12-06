import React from 'react';
import { browserHistory } from 'react-router'
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import WishModalEditor from './WishModalEditor.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListTokenFetcher from './ListTokenFetcher.js';
import Button from 'react-bootstrap/lib/Button';
import uuidV4 from 'uuid/v4';
import Follow from './Follow.js';
import FollowButton from './FollowButton.js';
import FollowsList from './FollowsList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.params.listToken) {
      this.listToken = this.props.params.listToken
      this.isSomeoneElse = !this.props.auth.isMe(this.listToken)
    } else {
      this.isSomeoneElse = false
    }

    this.isMe = !this.isSomeoneElse

    this.state = { wishes: new Map(), follows: new Map() }
    this.upsertWish = this.upsertWish.bind(this);
    this.removeWish = this.removeWish.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.refreshFollows = this.refreshFollows.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    this.refreshFollows();
    this.fetchUserInfo();
    this.fetchWishes();
  }

  render() {
    let maybeToolbar = undefined;
    let maybeEditor = undefined;
    if (this.isMe) {
      maybeToolbar = (
        <div>
          <Button bsStyle="primary" onClick={this.add}>Add</Button>
          <ListTokenFetcher auth={this.props.auth} location={this.props.location}/>
        </div>
      )

      maybeEditor = <WishModalEditor upsertWish={this.upsertWish} wish={this.state.wishInEditor} />
    }

    let maybeNameHeader = undefined;
    if (this.state.name) {
      if(this.isMe) {
        maybeNameHeader = <h3>Welcome {this.state.name}, this is your wishlist:</h3>;
      } else {
        maybeNameHeader = <h3>Wishlist for {this.state.name}:</h3>;
      }
    }

    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        {maybeNameHeader}
        <WishList isMe={this.isMe} wishes={this.state.wishes.values()} editWish={this.edit} removeWish={this.removeWish}/>
        {maybeEditor}
        <FollowButton follows={this.state.follows.values()} friendToken={this.listToken} auth={this.props.auth} onFollowChange={this.refreshFollows}/>
        <FollowsList follows={this.state.follows} isSomeoneElse={this.isSomeoneElse} />
        {maybeToolbar}
        <Button onClick={this.logout}>Logout</Button>
      </div>
    );
  }

  upsertWish(wish) {
    fetch("/api/wish/" + wish.id, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`},
      method: 'PUT',
      body: JSON.stringify({
        title: wish.title
      })
    }).then(x => {
      if (x.status === 200) {
        this.setState((state) => {
          state.wishInEditor = undefined;
          state.wishes.set(wish.id, wish);
          return state
        });
      }
    });
  }

  removeWish(wish) {
    fetch("/api/wish/" + wish.id, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`},
      method: 'DELETE'
    }).then(x => {
      if (x.status === 202) {
        this.setState((state) => {
          state.wishInEditor = undefined;
          state.wishes.delete(wish.id);

          return state
        });
      }
    });
  }

  edit(wish) {
    this.setState({wishInEditor: wish});
  }

  add() {
    this.edit(new Wish(uuidV4(), this.props.auth.getUserId(), ""));
  }

  refreshFollows() {
    fetch("/api/user/follows", {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
    }).then(x => {
      if (x.status === 200) {
        x.json().then(fs => {
          this.setState({follows: new Map()});
          fs.forEach( f => {
            fetch("/api/user?friend=" + f.token, {
              headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
            }).then(x => {
              if (x.status === 200) {
                x.json().then(ui => {
                  this.setState(s => {
                    let follow = new Follow(f.id, ui.name, f.token);
                    s.follows.set(f.id, follow)
                  });
                });
              }
            });
          });
        })
      }
    });
  }

  fetchUserInfo() {
    let infoUrl = undefined;
    if(this.isMe) {
      infoUrl = "/api/user"
    } else {
      infoUrl = "/api/user?friend=" + this.listToken
    }

    fetch(infoUrl, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
    }).then(x => {
      if (x.status === 200) {
        x.json().then(ws => {
          this.setState({name: ws.name});
        });
      }
    });
  }

  fetchWishes() {
    let fetchUrl = undefined;
    if(this.isMe) {
      fetchUrl = "/api/wish"
    } else {
      fetchUrl = "/api/wish?friend=" + this.listToken
    }

    fetch(fetchUrl, {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
    }).then(x => {
      if (x.status === 200) {
        x.json().then(ws => {
          let wishes = ws.map(w => [w.id, new Wish(w.id, this.props.auth.getUserId(), w.title)]);
          this.setState({ wishes: new Map(wishes)})
        })
      }
    });
  }

  logout() {
    this.props.auth.logout();
    browserHistory.push("/login");
  }
}

export default App;
