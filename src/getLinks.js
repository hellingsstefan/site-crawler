import { WEBSITE_ORIGIN, WEBSITE_DOMAIN_NAME } from './config.js';

export const getSubDomainLinks = list => list.filter(url => (getSubDomain(url) !== 'www' && getDomain(url) === WEBSITE_DOMAIN_NAME));
export const getThirdPartyDomainLinks = list => list.filter(url => getDomain(url) !== WEBSITE_DOMAIN_NAME);
export const getSameDomainLinks = list => list.filter(url => getOrigin(url) === WEBSITE_ORIGIN)
export const getSamePageLinks = list => list.filter(url => getHash(url));

const getSubDomain = url => new URL(url).host.split('.')[0];
const getDomain = url => new URL(url).host.split('.')[1];
const getOrigin = url => new URL(url).origin;
const getHash = url => new URL(url).hash;
