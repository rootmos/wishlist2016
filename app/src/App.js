import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class App extends React.Component {
  render() {
    let ws = [new Wish("Foo"), new Wish("Bar")];
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={ws}/>
      </div>
    );
  }
}

export default App;
