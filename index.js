const http2 = require('http2');

class MailazyClient {
  constructor(config) {
    config = { ...config };
    this._cilent = {
      accessKey: config.accessKey,
      accessSecret: config.accessSecret,
      client: http2.connect(config.endpoint || 'https://api.mailazy.com')
    };

    this.send = this.send.bind(this);
  }

  send = (payload) =>
    new Promise((resolve, reject) => {
      if (!payload) {
        reject(new Error('payload can not be empty!'));
      }

      if (!payload.to || !payload.from || !payload.subject) {
        reject(new Error('invalid payload!'));
      }

      const p = {
        to: [payload.to],
        from: payload.from,
        subject: payload.subject,
        content: [
          {
            type: 'text/plain',
            value: payload.text
          },
          {
            type: 'text/html',
            value: payload.html
          }
        ]
      };

      const buffer = Buffer.from(JSON.stringify(p), 'utf8');

      const req = this._cilent.client.request({
        [http2.constants.HTTP2_HEADER_SCHEME]: 'https',
        [http2.constants.HTTP2_HEADER_METHOD]:
          http2.constants.HTTP2_METHOD_POST,
        [http2.constants.HTTP2_HEADER_PATH]: '/v1/mail/send',
        'Content-Type': 'application/json',
        'Content-Length': buffer.length,
        'X-Api-Key': this._cilent.accessKey,
        'X-Api-Secret': this._cilent.accessSecret
      });

      req.setEncoding('utf8');

      const data = [];
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.write(buffer);
      req.end();
      req.on('end', () => {
        resolve(data.join(''));
      });
    });
}

module.exports = MailazyClient;
