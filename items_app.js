var Items = new Mongo.Collection("items"); // Since we've removed autopublish, this isnt going to display on the client.

if (Meteor.isClient) {
  Meteor.subscribe("items", "apple"); // This "items" string is the same as the one in the server publish function, not the one from the collection. It's subscribing to a "channel"

  Template.items.helpers({ // This is running hte same code as the server is running when we are subscribing to the same channel. Keep in mind that it's only going to find everythign in that channel that we have allowed to be published to that channel, so it might not necessarily be everythign that is in teh collection.
    items: function() {
      return Items.find();
    }
  })

}


if (Meteor.isServer) { // Publish can take parameters. In fact, it can take in as many parameters as you want.
  Meteor.publish("items", function(category) { // Note that the "items" that we are passing through here has nothign at all to do with the name of the collection described above.
    return Items.find({category: category}); // This will publish under the "items" term everything that is in the server-side Items collection. This will basically recreate the functionality of the autopublish package. But we aren't done yet because we haven't subscribed to it in the client.
  })
}
