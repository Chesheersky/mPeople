Meteor.publish('quests', function (options) {
    check(options, {
        sort: Object,
        limit: Number
    });
    return Quests.find({}, options);
});

Meteor.publish('singleQuest', function (id) {
    check(id, String);
    return Quests.find(id);
});

Meteor.publish('comments', function (questId) {
    check(questId, String);
    return Comments.find({questId: questId});
});

Meteor.publish('visits', function (questId) {
    check(questId, String);
    return Visits.find({questId: questId});
});

Meteor.publish('notifications', function () {
    return Notifications.find({userId: this.userId, read: false});
});
