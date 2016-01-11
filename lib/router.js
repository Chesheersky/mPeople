Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
    return [Meteor.subscribe('notifications')]
  }
});

QuestsListController = RouteController.extend({
  template: 'questsList',
  increment: 5, 
  questsLimit: function() {
    return parseInt(this.params.questsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.questsLimit()};
  },
  subscriptions: function() {
    this.questsSub = Meteor.subscribe('quests', this.findOptions());
  },
  quests: function() {
    return Quests.find({}, this.findOptions());
  },
  data: function() {
    var self = this;
    return {
      quests: self.quests(),
      ready: self.questsSub.ready,
      nextPath: function() {
        if (self.quests().count() === self.questsLimit())
          return self.nextPath();
      }
    };
  }
});

NewQuestsController = QuestsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newQuests.path({questsLimit: this.questsLimit() + this.increment})
  }
});

BestQuestsController = QuestsListController.extend({
  sort: {visitsCount: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestQuests.path({questsLimit: this.questsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: NewQuestsController
});

Router.route('/new/:questsLimit?', {name: 'newQuests'});

Router.route('/best/:questsLimit?', {name: 'bestQuests'});


Router.route('/quests/:_id', {
  name: 'questPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singleQuest', this.params._id),
      Meteor.subscribe('visits', this.params._id)
    ];
  },
  data: function() { return Quests.findOne(this.params._id); }
});

Router.route('/quests/:_id/edit', {
  name: 'questEdit',
  waitOn: function() { 
    return Meteor.subscribe('singleQuest', this.params._id);
  },
  data: function() { return Quests.findOne(this.params._id); }
});

Router.route('/submit', {name: 'questSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'questPage'});
Router.onBeforeAction(requireLogin, {only: 'questSubmit'});
