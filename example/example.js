const MailazyClient = require('../index');
const client = new MailazyClient({ accessKey: '', accessSecret: '' });

const fn = async () => {
  try {
    const resp = await client.send({
      to: 'test@example.com', // required
      from: 'no-reply@example.com', // Use domain you verified, required
      subject: '', // required
      text: '',
      html: ''
    });
    console.log('resp: ' + resp);
  } catch (err) {
    console.log('errror: ' + err);
  }
};

fn();
