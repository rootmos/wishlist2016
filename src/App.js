import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import WishModalEditor from './WishModalEditor.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListTokenFetcher from './ListTokenFetcher.js';
import Button from 'react-bootstrap/lib/Button';
import uuidV4 from 'uuid/v4';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wishes: new Map() }
    this.upsertWish = this.upsertWish.bind(this);
    this.removeWish = this.removeWish.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);

    fetch("/api/wishlist", {
      headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}
    }).then(x => {
      if (x.status === 200) {
        x.json().then(ws => {
          let wishes = ws.map( w => [w.id, new Wish(w.id, this.props.auth.getUserId(), w.title)]);
          this.setState({ wishes: new Map(wishes)})
        })
      }
    });

  }

  render() {
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={this.state.wishes.values()} editWish={this.edit} removeWish={this.removeWish}/>
        <WishModalEditor upsertWish={this.upsertWish} wish={this.state.wishInEditor} />
        <Button bsStyle="primary" onClick={this.add}>Add</Button>
        <ListTokenFetcher auth={this.props.auth} location={this.props.location}/>
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
}

export default App;
