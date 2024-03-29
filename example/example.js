const MailazyClient = require('../index');
const client = new MailazyClient({
  accessKey: '___access_key___',
  accessSecret: '___access_secret___'
});

const fn = async () => {
  try {
    const resp = await client.send({
      to: 'test@example.com', // required
      from: 'no-reply@example.com', // Use domain you verified, required
      subject: 'test email from node.js app', // required
      text: 'hello world!',
      html: '<b>hello world</b>'
    });
    console.log('resp: ' + resp);
  } catch (err) {
    console.log('error: ' + err);
  }
};

fn();
