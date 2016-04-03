Visits = new Mongo.Collection('visits');

Meteor.methods({
    visitInsert: function (visitAttributes) {
        check(this.userId, String);
        check(visitAttributes, {
            questId: String,
            phone: String,
            name: String,
            coupon: String,
            comment: String
        });

        var user = Meteor.user();
        var quest = Quests.findOne(visitAttributes.questId);

        if (!quest)
            throw new Meteor.Error('invalid-visit', 'Посещать ничто нельзя.');

        var visit = _.extend(visitAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });

        // update the quest with the number of visits
        Quests.update(visit.questId, {$inc: {visitsCount: 1}});

        // create the visit, save the id
        visit._id = Visits.insert(visit);

        return visit._id;
    }
});
