import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { Social } from '../imports/api/social.js'
import { connect } from 'mqtt/lib/connect';

var moment = require('moment');

export const config = {
  mqttHost: "mqtt://192.168.250.60",
  mqttPort: 1883
};

export const client = connect(config.mqttHost);

client.on("connect", function() {
  console.log("---- mqtt client connected ----");
})



Meteor.publish('social', function socialPublication() {
  return Social.find();
});

//https://www.rescuetime.com/anapi/data?rtapi_key=B63iqLa0xvENAx6wCaiKzq0CHW6TqSl2bVbI_eFP&perspective=interval&format=csv&resolution_time=hour&restrict_kind=activity&restrict_begin=2009-01-01&restrict_end=2017-12-31

Meteor.methods({
  loadSocial: function() {
    console.log("loadSocial");
    HTTP.call('GET', 'https://www.rescuetime.com/anapi/daily_summary_feed', {
      params: { key: "B63iqLa0xvENAx6wCaiKzq0CHW6TqSl2bVbI_eFP", 
      date: moment().add(-1, "days").format("YYYY-MM-DD"),
      }
    }, (error, result) => {
      console.log (error);
      console.log (moment().add(-1, 'days'));
      console.log (moment().add(-1, "days").format("YYYY-MM-DD"));
      if (!error) {

        var data = result.data;
        console.log(data.length);
        console.log(data[0].social_networking_duration_formatted);
        console.log(data[0].date);

        Social.insert({duration:data[0].social_networking_duration_formatted, 
          date:moment().add(-1, "days").format("YYYY-MM-DD"),
            updatedat:new Date()})
        client.publish("social", color);

        //console.log(data[0].social_networking_duration_formatted);
          //for (var i = 0; i < data.length; i++) {
          //  console.log(data[i].social_networking_duration_formatted);
          //  console.log(data[i].date);
            //Asteroids.insert({text:data["near_earth_objects"][dateKey][i].name, date:new Date()})
          //}
        
      }
    });
  }
})


Meteor.startup(() => {
  // code to run on server at startup
});




//https://www.rescuetime.com/anapi/data?rtapi_key=B63iqLa0xvENAx6wCaiKzq0CHW6TqSl2bVbI_eFP&perspective=interval&format=csv&resolution_time=hour&restrict_kind=activity&restrict_begin=2009-01-01&restrict_end=2017-12-31
