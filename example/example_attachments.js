const fs = require('fs').promises;
const MailazyClient = require('../index');
const client = new MailazyClient({
  accessKey: '___access_key___',
  accessSecret: '___access_secret___'
});

const fn = async () => {
  try {
    const fileName = 'dummy.pdf';
    const pathToAttachment = `${__dirname}/${fileName}`;
    const attachment = await fs.readFile(pathToAttachment, 'base64');

    const resp = await client.send({
      to: 'test@example.com', // required
      from: 'no-reply@example.com', // Use domain you verified, required
      subject: 'test email from node.js app with attachment', // required
      text: 'hello world!',
      html: '<b>hello world</b>',
      attachments: [
        {
          type: 'application/pdf',
          file_name: fileName,
          content: attachment
        }
      ]
    });
    console.log('resp: ' + resp);
  } catch (err) {
    console.log('error: ' + err);
  }
};

fn();
