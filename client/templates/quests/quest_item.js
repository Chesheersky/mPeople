Template.questItem.helpers({
  ownQuest: function() {
    return this.userId == Meteor.userId();
  }
});