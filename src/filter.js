import { WEBSITE_HREF } from './config.js';
import { getFilesList } from './getFiles.js';

export default function filterList(list, { currentDir, removeHash = true, removeFiles = true }) {
    if (!currentDir)
        throw new Error('\x1b[31m\x1b[40m No currentDir set for \'filterList()\'! \x1b[0m\n\n');

    let set = [...new Set(list)]
        .filter(url => url !== '/' && url !== WEBSITE_HREF)                     // remove start link
        .filter(url => url !== 'javascript:;' && url !== '')                    // remove non functioning link
        .filter(url => !url.startsWith('about:blank#'))                         // remove self referring
        .filter(url => !url.startsWith('mailto:'))                              // remove email links
        .filter(url => !url.startsWith('tel:'))                                 // remove phone links
        .map(url => (url.endsWith('/') ? url.slice(0, -1) : url))               // remove trailing "/" prevent multiple scraping of same page
        .map(url => setAbsolutePath(url, currentDir))                           // set absolute path
        .sort()
    ;

    if (removeFiles) {
        const files = getFilesList(set);
        set = set.filter(url => files.indexOf(url) === -1);
    }

    if (removeHash)
        set = set.map(url => removeHashFromUrl(url));

    return set;
}

const removeHashFromUrl = url => new URL(url).href.replace(new URL(url).hash, '');
const setBasePath = (url, dir) => `${new URL(dir).origin}${url}`;
const setAbsolutePath = (url, dir) => {
    let path = url;

    if (path.startsWith('/'))
        path = setBasePath(path, dir);

    if (path.match(/^(?!.*(http|https)).*$/)) // path only to absolute path
        path = `${dir}${path}`;

    if (path.match(/^\/[a-z0-9]/)) // relative paths to absolute
        path = `${dir}${path}`;

    if (path.match(/^\/\/[a-z0-9]/)) // relative protocol to absolute
        path = `https:${path}`;

    return path;
}
