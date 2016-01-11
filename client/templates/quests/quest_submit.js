Template.questSubmit.onCreated(function() {
  Session.set('questSubmitErrors', {});
});

Template.questSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('questSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('questSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.questSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var quest = {
      description: $(e.target).find('[name=description]').val(),
      title: $(e.target).find('[name=title]').val()
    };
    
    var errors = validateQuest(quest);
    if (errors.title || errors.description)
      return Session.set('questSubmitErrors', errors);
    
    Meteor.call('questInsert', quest, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      // show this result but route anyway
      if (result.questExists)
        throwError('This quest has already been posted');
      
      Router.go('questPage', {_id: result._id});
    });
  }
});