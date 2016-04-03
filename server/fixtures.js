// Fixture data
if (Quests.find().count() === 0) {
  var now = new Date().getTime();
  
  // create two users
  var antoninaId = Meteor.users.insert({
    profile: { name: 'Тоня' }
  });
  var antonina = Meteor.users.findOne(antoninaId);
  var mariaId = Meteor.users.insert({
    profile: { name: 'Маша' }
  });
  var maria = Meteor.users.findOne(mariaId);
  
  var telescopeId = Quests.insert({
    title: 'Introducing Telescope',
    userId: maria._id,
    author: maria.profile.name,
    description: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000),
    visitsCount: 2,
    commentsCount: 0,
  });
  
  Visits.insert({
    questId: telescopeId,
    userId: antonina._id,
    author: antonina.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    phone: "89009009000",
    name: "Валера",
    coupon: "33",
    comment: "Ну ёбаный, Валера!"
  });
  
  Visits.insert({
    questId: telescopeId,
    userId: maria._id,
    author: maria.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    phone: "89009009001",
    name: "Толя",
    coupon: "биглион",
    comment: "Парикмахер дядя Толик, подстриги меня под нолик!"
  });
  
  Quests.insert({
    title: 'Meteor',
    userId: maria._id,
    author: maria.profile.name,
    description: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000),
    visitsCount: 0,
    commentsCount: 0,
  });
  
  Quests.insert({
    title: 'The Meteor Book',
    userId: antonina._id,
    author: antonina.profile.name,
    description: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000),
    visitsCount: 0,
    commentsCount: 0,
  });
  
  for (var i = 0; i < 10; i++) {
    Quests.insert({
      title: 'Test quest #' + i,
      author: maria.profile.name,
      userId: maria._id,
      description: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      visitsCount: 0,
      commentsCount: 0,
    });
  }
}