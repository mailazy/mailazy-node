# mailazy-api

> Unofficial Mailazy NodeJs SDK Client with some internal boost (faster & less-buggy)


## Table of Contents

* [Install](#install)
  * [Prerequisites](#prerequisites)
  * [Generate Access Keys](#generate-access-keys)
  * [Install Package](#install-package)
* [Usage](#usage)
* [License](#license)


## Install

### Prerequisites

* Node.js version >= 10
* Mailazy account, [sign up for free](https://app.mailazy.com/signup?source=mailazy-api) to send up to 50,000 email/month free.

### Generate Access Keys

You need a sender/domain authenticated account in order to generate Access Keys from the [Mailazy Console](https://app.mailazy.com/dashboard)

### Install Package

[npm][]:

```sh
npm install mailazy-api
```

[yarn][]:

```sh
yarn add mailazy-api
```


## Usage

```js
const MailazyClient = require('mailazy-api');

const client = new MailazyClient({ accessKey: '', accessSecret: '' });

const fn = async () => {
    try {
        const resp = await client.send({
            to: 'test@example.com', // required
            from: 'no-reply@example.com', // Use domain you verified, required
            subject: '', // required
            text: '',
            html: '',
        });
        console.log("resp: " + resp);
    } catch (e) {
        console.log("errror: " + e);
    }
}

fn();
```


## License

[MIT](LICENSE) © Mailazy & Angrymouse


##

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
