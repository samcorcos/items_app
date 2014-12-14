var Items = new Mongo.Collection("items"); // Since we've removed autopublish, this isnt going to display on the client.

if (Meteor.isClient) {

  Meteor.autosubscribe(function() {
    Meteor.subscribe("items", Session.get("category")); // This "items" string is the same as the one in the server publish function, not the one from the collection. It's subscribing to a "channel"
  });

  // since we want our filter to be reactive based on user input, we will set it to a session variable.

  Template.items.helpers({ // This is running hte same code as the server is running when we are subscribing to the same channel. Keep in mind that it's only going to find everythign in that channel that we have allowed to be published to that channel, so it might not necessarily be everythign that is in teh collection.
    items: function() {
      return Items.find();
    }
  })

  Template.name.events({
    'keypress input': function(e,t) {
      if (e.keyCode === 13) {
        Session.set("category", e.currentTarget.value); // We are setting our reactive value here
        e.currentTarget.value = ""; // resetting the text box to empty
      }
    }
  })

}

// There are a couple of options for stopping a subscription. We can store the Meteor.subscribe() in a variable, then set the variable.stop() to an event to stop the subscription.
// But we can also use "autosubscribe", which is what we should use going forward.


if (Meteor.isServer) { // Publish can take parameters. In fact, it can take in as many parameters as you want.
  Meteor.publish("items", function(category) { // Note that the "items" that we are passing through here has nothign at all to do with the name of the collection described above.
    return Items.find({category: category}); // This will publish under the "items" term everything that is in the server-side Items collection. This will basically recreate the functionality of the autopublish package. But we aren't done yet because we haven't subscribed to it in the client.
  })
}


// We want the user to be able to set the category they want to filter by, and use the text box to do so
