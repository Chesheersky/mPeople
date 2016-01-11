Template.visitSubmit.onCreated(function() {
  Session.set('visitSubmitErrors', {});
});

Template.visitSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('visitSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('visitSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.visitSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $phone = $(e.target).find('[name=phone]');
    var $name = $(e.target).find('[name=name]');
    var $coupon = $(e.target).find('[name=coupon]');
    var $date = $(e.target).find('[name=date]');
    var $comment = $(e.target).find('[name=comment]');

    var visit = {
      phone: $phone.val(),
      name: $name.val(),
      coupon: $coupon.val(),
      date: $date.val(),
      comment: $comment.val(),
      questId: template.data._id
    };
    
    var errors = {};
    if (! visit.phone) {
      errors.phone = "Пожалуйста добавьте телефон";
      return Session.set('visitSubmitErrors', errors);
    }
    if (! visit.name) {
      errors.name = "Пожалуйста добавьте имя";
      return Session.set('visitSubmitErrors', errors);
    }
    //ToDo validate date
    
    Meteor.call('visitInsert', visit, function(error, visitId) {
      if (error){
        throwError(error.reason);
      } else {
        $phone.val('');
        $name.val('');
        $coupon.val('');
        $date.val('');
        $comment.val('');
      }
    });
  }
});