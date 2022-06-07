const http2 = require('http2');
const packageJson = require('./package.json');
const process = require('process');

class MailazyClient {
  constructor(config) {
    config = { ...config };
    this._internals = {
      accessKey: config.accessKey,
      accessSecret: config.accessSecret,
      currentApiVersion: '1',
      httpClient: http2.connect(config.endpoint || 'https://api.mailazy.com'),
      userAgent: this.getUserAgentHeader()
    };

    this.send = this.send.bind(this);
  }

  send = (payload) =>
    new Promise((resolve, reject) => {
      const errors = [
        [!payload, 'Payload can not be empty'],
        [!payload.to, 'No mail receiver (property "to" not defined)'],
        [!payload.from, 'No mail sender (property "from" not defined)'],
        [
          !payload.subject,
          'No subject, all mails must have subjects (property "subject" not defined)'
        ],
        [
          !payload.html && !payload.text,
          'No mail content (Neither the html property nor the text property is set)'
        ]
      ]
        .filter((error) => error[0])
        .map((error) => error[1]);

      if (errors.length > 0) {
        reject(new Error('- ' + errors.join('\n- ')));
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
      
      if (payload.reply_to) {
        p.reply_to = payload.reply_to;
      }

      if (payload.attachments && payload.attachments.length > 0) {
        p.attachments = payload.attachments;
      }

      const buffer = Buffer.from(JSON.stringify(p), 'utf8');

      const req = this._internals.httpClient.request({
        [http2.constants.HTTP2_HEADER_SCHEME]: 'https',
        [http2.constants.HTTP2_HEADER_METHOD]:
          http2.constants.HTTP2_METHOD_POST,
        [http2.constants
          .HTTP2_HEADER_PATH]: `/v${this._internals.currentApiVersion}/mail/send`,
        'Content-Type': 'application/json',
        'Content-Length': buffer.length,
        'X-Api-Key': this._internals.accessKey,
        'X-Api-Secret': this._internals.accessSecret,
        'User-Agent': this._internals.userAgent
      });

      const data = [];
      req.on('data', (chunk) => {
        data.push(chunk);
      });
      req.once('error', (err) => {
        reject(err);
      });
      req.write(buffer);
      req.end();
      req.once('end', () => {
        resolve(Buffer.concat(data).toString('utf8'));
      });
    });

  getUserAgentHeader = () => {
    return `MailazySDK/${packageJson.name} ${packageJson.version} (lang=node.js;v=${process.versions.node};bit=${process.arch};os=${process.platform})`;
  };
}

module.exports = MailazyClient;
