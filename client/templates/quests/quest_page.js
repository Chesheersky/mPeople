Template.questPage.helpers({
  visits: function() {
    return Visits.find({questId: this._id});
  }
});