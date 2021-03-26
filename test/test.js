const test = require('ava');

const Client = require('..');

test.beforeEach((t) => {
  const client = new Client({});
  Object.assign(t.context, { client });
});

test('returns itself', (t) => {
  t.true(t.context.client instanceof Client);
});

test('sets a config object', (t) => {
  const client = new Client({
    accessKey: 'test-key',
    accessSecret: 'test-secret'
  });
  t.true(client instanceof Client);
});
