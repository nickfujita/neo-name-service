import { rpc, api, sc, u, wallet } from '@cityofzion/neon-js';
const { isAddress } = wallet;
const { Query } = rpc;
const { invokeScript } = Query;
const { fillUrl } = api;
const { ContractParam, createScript } = sc;
const { byteArray } = ContractParam;
const { sha256, str2hexstring, hexstring2str } = u;

function resolveDomain(name: string): Promise<string> {
  if (!name || !name.endsWith('.neo')) {
    return Promise.reject('Not a valid domain name.');
  }

  try {
    const protocol = {
      type: 'String',
      value: 'addr',
    };

    const empty = {
      type: 'String',
      value: '',
    };

    const subdomain = name.replace(/.neo$/, '');
    const hashSubdomain = sha256(str2hexstring(subdomain));
    const hashDomain = sha256(str2hexstring('neo'));

    const hashName = sha256(hashSubdomain.concat(hashDomain));
    const parsedName = byteArray(hashName, 'name');

    const scriptHash = '348387116c4a75e420663277d9c02049907128c7';
    const operation = 'resolve';
    const args = [protocol, parsedName, empty];

    const props = {scriptHash, operation, args};
    const script = createScript(props);
    const invoke = invokeScript(script);

    return fillUrl({net: 'MainNet', address: ''})
    .then(config => invoke.execute(config.url))
    .then(res => res.result.stack[0].value)
    .then(value => {
      const address = hexstring2str(value);
      if (value === '00' || !isAddress(address)) {
        throw new Error('No domain found.');
      }
      return address;
    });
  } catch (error) {
    return Promise.reject('Error resolving domain name.');
  }
}

export default {
  resolveDomain,
};
