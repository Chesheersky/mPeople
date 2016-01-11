Quests = new Mongo.Collection('quests');

Quests.allow({
  update: function(userId, quest) { return ownsDocument(userId, quest); },
  remove: function(userId, quest) { return ownsDocument(userId, quest); },
});

Quests.deny({
  update: function(userId, quest, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'description', 'title').length > 0);
  }
});

Quests.deny({
  update: function(userId, quest, fieldNames, modifier) {
    var errors = validateQuest(modifier.$set);
    return errors.title || errors.description;
  }
});

validateQuest = function (quest) {
  var errors = {};

  if (!quest.title)
    errors.title = "Введите название";
  
  if (!quest.description)
    errors.description =  "Введите описание";

  return errors;
}

Meteor.methods({
  questInsert: function(questAttributes) {
    check(this.userId, String);
    check(questAttributes, {
      title: String,
      description: String
    });
    
    var errors = validateQuest(questAttributes);
    if (errors.title || errors.description)
      throw new Meteor.Error('invalid-quest', "Нужно ввести название и описание");
    
    var user = Meteor.user();
    var quest = _.extend(questAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date(),
      visitsCount: 0
    });
    
    var questId = Quests.insert(quest);
    
    return {
      _id: questId
    };
  }
});
