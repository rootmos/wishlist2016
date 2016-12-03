import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import uuidV4 from 'uuid/v4';

class App extends React.Component {
  render() {
    let ws = [new Wish(uuidV4(), "Foo"), new Wish(uuidV4(), "Bar")];
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={ws}/>
      </div>
    );
  }
}

export default App;
