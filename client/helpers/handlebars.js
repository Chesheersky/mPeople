Template.registerHelper('pluralize', function(n, thing, things) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + things;
  }
});