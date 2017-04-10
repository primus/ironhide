# ironhide

[![Greenkeeper badge](https://badges.greenkeeper.io/primus/ironhide.svg)](https://greenkeeper.io/)

Ironhide is a small React wrapper for Primus. It is one of the many ways on how
you can use React with Primus. The benefit of using Ironhide is that it shares
a single connection with all child components by leveraging the React Context
API.

## Installation

The module is released in the public npm registry and can be installed by
running on your CLI:

```
npm install --save ironhide
```

## Usage

The component assumes that the `Primus` variable is already available on your
page as global. So just make sure you include the Primus library on your page
**before** you mount the application that uses Ironhide.

Once the application is mounted we will establish a connection with the supplied
Primus server URL and once we component is unmounted we close the connection
automatically again.

The Ironhide component accepts the following arguments:

- **url** The URL of the Primus server we should connect to.
- **config** Optional Primus configuration, see [Primus] for all available
  options.

In the following example we create a small React component that wraps your base
application with Ironhide to provide it with a single Real-time connection.

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import Ironhide from 'ironhide';
import App from './renderer';

/**
 * Default application wrapper.
 *
 * @constructor
 */
export default class Realtime extends Component {
  render() {
    <Ironhide url='http://localhost:8080'>
      <App />
    </Ironhide>
  }
}

//
// Mount the application to a root element that is specified on our imaginary
// page.
//
render(<Realtime />, document.getElementById('root'));
```

## License

MIT
