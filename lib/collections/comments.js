Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function (commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            questId: String,
            content: String
        });
    
        var user = Meteor.user();
        var quest = Quests.findOne(commentAttributes.questId);

        if (!quest)
            throw new Meteor.Error('invalid-comment', 'Комментировать ничто нельзя.');

        var comment = _.extend(commentAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        // update the quest with the number of comment
        Quests.update(comment.questId, {$inc: {commentsCount: 1}});

        // create the comment, save the id
        comment._id = Comments.insert(comment);

        return comment._id;
    }
});
