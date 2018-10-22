# NEO Name Service
A domain resolver for the NEO Name Service.

Provide a NNS domain name to resolve, eg. test.neo, and if it is mapped, it will return the address.

## Usage

In a browser - cdn [![](https://data.jsdelivr.com/v1/package/npm/neo-ns/badge)](https://www.jsdelivr.com/package/npm/neo-ns)
```
<script src="https://cdn.jsdelivr.net/npm/neo-ns/lib/browser/nns.min.js"></script>
```
```
window.NeoNS
```

Install via npm [![npm version](https://badge.fury.io/js/neo-ns.svg)](https://badge.fury.io/js/neo-ns)
```
npm i --save neo-ns

or

yarn add neo-ns
```

```
var NeoNS = require('neo-ns');

import NeoNS from 'neo-ns';
```

## Example
```
NeoNS.resolveDomain('test.neo')
.then(address => {
  console.log('Success!', address)
})
.catch(err => {
  console.log('Domain name not found.');
})
```
