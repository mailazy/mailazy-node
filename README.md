# mailazy-node

> Mailazy NodeJs SDK Client

## Table of Contents

- [Install](#install)
  - [Prerequisites](#prerequisites)
  - [Generate Access Keys](#generate-access-keys)
  - [Install Package](#install-package)
- [Usage](#usage)
- [License](#license)

## Install

### Prerequisites

- Node.js version >= 10
- Mailazy account, [sign up for free](https://app.mailazy.com/signup?source=mailazy-node).

### Generate Access Keys

You need a sender/domain authenticated account in order to generate Access Keys from the [Mailazy Console](https://app.mailazy.com/dashboard)

### Install Package

[npm][]:

```sh
npm install mailazy-node
```

[yarn][]:

```sh
yarn add mailazy-node
```

## Usage

```js
const MailazyClient = require('mailazy-node');
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
  } catch (e) {
    console.log('error: ' + e);
  }
};
fn();
```

## License

[MIT](LICENSE) © Mailazy

##

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
