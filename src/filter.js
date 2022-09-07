import { WEBSITE_HREF } from './config.js';

export default function filterList(scrapeList, removeHash = true) {
    let set = [...new Set(scrapeList)]
        .sort()
        .filter(a => a !== '/' && a !== WEBSITE_HREF) // remove homepage link
        .filter(a => a !== 'javascript:;' && a !== '') // remove non functioning link
        .filter(a => !a.startsWith('about:blank#')) // remove self referring
        .filter(a => !a.startsWith('tel:')) // remove phone links
        .filter(a => !a.startsWith('mailto:')) // remove email links
        .map(a => (a.match(/^\/[a-z0-9]/) ? `${WEBSITE_HREF}${a}` : a)) // relative paths to absolute
        .map(a => (a.match(/^\/\/[a-z0-9]/) ? `https:${a}` : a)) // relative protocol to absolute
    ;

    if (removeHash)
        set = set.map(a => removeHashFromUrl(a));

    return set;
}

function removeHashFromUrl(urlString) {
    const url = new URL(urlString);

    return url.href.replace(url.hash, '');;
}
