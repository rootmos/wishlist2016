import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import WishEditor from './WishEditor.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import uuidV4 from 'uuid/v4';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wishes:[new Wish(uuidV4(), "Foo"), new Wish(uuidV4(), "Bar")]};
    this.upsertWish = this.upsertWish.bind(this);
  }

  render() {
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={this.state.wishes}/>
        <WishEditor upsert={this.upsertWish}/>
      </div>
    );
  }

  upsertWish(wish) {
    this.setState((state) => {
      state.wishes.push(wish);
      return state
    });
  }
}

export default App;
