import React, { Component } from 'react';
import Display from './Display.js';
import SocialList from './SocialList'

export default class App extends Component {

  getSocial() {
    return [
      { _id: 1, text: 'asteroid 1' },
      { _id: 2, text: 'asteroid 2' },
      { _id: 3, text: 'asteroid 3' },
    ];
  }


  renderAsteroids() {
    return this.getAsteroids().map((asteroid) => (
      <Display key={asteroid._id} asteroid={asteroid} />
    ));
  }

  handleSubmit(event) {
    event.preventDefault();
 
    Meteor.call("loadSocial");
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>react-app</h1>
        </header>

        <form className="load-social" onSubmit={this.handleSubmit.bind(this)} >
          <button
            type="submit"
          >Load social</button>
        </form>

        <ul>
          <SocialList />
        </ul>
        
      </div>
    );
  }
}