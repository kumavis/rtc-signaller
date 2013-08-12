var test = require('tape');
var createSignaller = require('..');

module.exports = function(messenger, peers) {
  var s;

  test('create', function(t) {
    t.plan(2);
    t.ok(s = createSignaller(messenger), 'created');
    t.ok(s.id, 'have id');
  });

  test('announce', function(t) {
    peers.expect(t, '/announce|{"id":"' + s.id + '"}');
    s.announce();
  });

  test('disconnect', function(t) {
    peers.expect(t, '/leave|{"id":"' + s.id + '"}');
    s.leave();
  });

  test('announce with attributes', function(t) {
    peers.expect(t, {
      type: 'announce',
      id: s.id,
      name: 'Bob'
    });

    s.announce({ name: 'Bob' });
  });

  test('announce with different attributes', function(t) {
    peers.expect(t, {
      type: 'announce',
      id: s.id,
      name: 'Fred'
    });

    s.announce({ name: 'Fred' });
  });

  test('disconnect', function(t) {
    peers.expect(t, '/leave|{"id":"' + s.id + '"}');
    s.leave();
  });
};

