import React from 'react';
import './App.css';
import Wish from './Wish.js';
import WishList from './WishList.js';
import PageHeader from 'react-bootstrap/lib/PageHeader';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PageHeader bsClass="App-header">Wishlist 2016</PageHeader>
        <WishList wishes={[<Wish key={1} title="Foo"/>, <Wish key={2} title="Bar"/>]}/>
      </div>
    );
  }
}

export default App;
