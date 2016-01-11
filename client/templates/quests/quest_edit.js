Template.questEdit.onCreated(function() {
  Session.set('questEditErrors', {});
});

Template.questEdit.helpers({
  errorMessage: function(field) {
    return Session.get('questEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('questEditErrors')[field] ? 'has-error' : '';
  }
});

Template.questEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentQuestId = this._id;
    
    var questProperties = {
      description: $(e.target).find('[name=description]').val(),
      title: $(e.target).find('[name=title]').val()
    }
    
    var errors = validateQuest(questProperties);
    if (errors.title || errors.description)
      return Session.set('questEditErrors', errors);
    
    Quests.update(currentQuestId, {$set: questProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('questPage', {_id: currentQuestId});
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this quest?")) {
      var currentQuestId = this._id;
      Quests.remove(currentQuestId);
      Router.go('home');
    }
  }
});
