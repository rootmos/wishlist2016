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
    this.state = {wishes:[new Wish(uuidV4(), "Foo"), new Wish(uuidV4(), "Bar")]};
    this.upsertWish = this.upsertWish.bind(this);
    this.add = this.add.bind(this);
  }

  render() {
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={this.state.wishes}/>
        <WishModalEditor upsertWish={this.upsertWish} wish={this.state.wishInEditor}/>
        <Button onClick={this.add}>Add</Button>
      </div>
    );
  }

  upsertWish(wish) {
    this.setState((state) => {
      state.wishInEditor = undefined;
      state.wishes.push(wish);
      return state
    });
  }

  add() {
    this.setState({wishInEditor: new Wish(uuidV4(), "")});
  }
}

export default App;
