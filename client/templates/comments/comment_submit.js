Template.commentSubmit.onCreated(function () {
    Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
    errorMessage: function (field) {
        return Session.get('commentSubmitErrors')[field];
    },
    errorClass: function (field) {
        return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
    }
});

Template.commentSubmit.events({
    'submit form': function (e, template) {
        e.preventDefault();

        var $content = $(e.target).find('[name=content]');

        var comment = {
            content: $content.val(),
            questId: template.data._id
        };

        var errors = {};
        if (!comment.content) {
            errors.name = "Невозможно добавить пустой комментарий";
            return Session.set('commentSubmitErrors', errors);
        }

        Meteor.call('commentInsert', comment, function (error, commentId) {
            if (error) {
                throwError(error.reason);
            } else {
                $content.val('');
            }
        });
    }
});