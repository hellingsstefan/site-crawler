import axios from 'axios';
import { JSDOM } from 'jsdom';
import { getSamePageLinks, getSameDomainLinks, getSubDomainLinks, getThirdPartyDomainLinks } from './getLinks.js';
import { getFiles } from './getFiles.js';
import getCurrentDir from './getCurrentDir.js';
import filterList from './filter.js';

export default async function scrapePage(url, callBackFn = () => { }) {
    return axios
        .get(url)
        .then(response => {
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            const scrapedLinks = [...document.querySelectorAll('a[href]')].map(a => a.href);
            const currentDir = getCurrentDir(url);
            const listOfLinks = filterList(scrapedLinks, { currentDir });

            return {
                samePageLinks: getSamePageLinks(filterList(scrapedLinks, { currentDir, removeHash: false })),
                sameDomainLinks: getSameDomainLinks(listOfLinks),
                subDomainLinks: getSubDomainLinks(listOfLinks, currentDir),
                thirdPartyLinks: getThirdPartyDomainLinks(listOfLinks),
                ...getFiles(filterList(scrapedLinks, { currentDir, removeFiles: false })),
            };
        })
        .catch(error => ({ error }))
        .then(params => callBackFn(params));
}
