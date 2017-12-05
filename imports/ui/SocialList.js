import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import { Social } from '../api/social.js'
import Display from './Display.js'


class SocialList extends Component {

  renderSocial(social) {
    return social.map((social) => (
      <Display key={social._id} social={social} />
    ));
  }

  render() {
    const { social } = this.props
    console.log(social)
    return (
      <ul>
        {this.renderSocial(social)}
      </ul>
    )
  }
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  const handle = Meteor.subscribe('social');
  return {
    social: Social.find({}, {sort: {updatedat: -1}}).fetch(),
    //social: Social.findOne({}, {sort: {updatedat: -1, limit: 1}}).fetch(),
  };
})(SocialList);
