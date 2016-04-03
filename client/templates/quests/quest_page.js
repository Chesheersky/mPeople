Template.questPage.helpers({
    visits: function () {
        return Visits.find({questId: this._id});
    },
    comments: function () {
        return Comments.find({questId: this._id});
    }
});