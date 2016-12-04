import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import WishModalEditor from './WishModalEditor.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
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

    fetch("/api/hello/foo", {headers: { 'Authorization': `Bearer ${this.props.auth.getToken()}`}}).then(x => {
      console.log(x);
      x.text().then( x => console.log(x));
    });
  }

  render() {
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={this.state.wishes.values()} editWish={this.edit}/>
        <WishModalEditor upsertWish={this.upsertWish} wish={this.state.wishInEditor} removeWish={this.removeWish}/>
        <Button onClick={this.add}>Add</Button>
      </div>
    );
  }

  upsertWish(wish) {
    this.setState((state) => {
      state.wishInEditor = undefined;
      state.wishes.set(wish.id, wish);
      return state
    });
  }

  removeWish(wish) {
    this.setState((state) => {
      state.wishInEditor = undefined;
      state.wishes.delete(wish.id);
      return state
    });
  }

  edit(wish) {
    this.setState({wishInEditor: wish});
  }

  add() {
    this.edit(new Wish(uuidV4(), ""));
  }
}

export default App;
