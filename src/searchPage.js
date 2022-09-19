import axios from 'axios';
import { JSDOM } from 'jsdom';
import { getSameDomainLinks, getSubDomainLinks } from './getLinks.js';
import { getFiles } from './getFiles.js';
import getCurrentDir from './getCurrentDir.js';
import filterList from './filter.js';

export default async function searchPage(url, text = '', callBackFn = () => { }) {
    return axios
        .get(url)
        .then(response => {
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            const hasText = document.body.textContent.toLowerCase().includes(text.toLowerCase());
            const scrapedLinks = [...document.querySelectorAll('a[href]')].map(a => a.href);
            const currentDir = getCurrentDir(url);
            const listOfLinks = filterList(scrapedLinks, { currentDir });

            return {
                sameDomainLinks: getSameDomainLinks(listOfLinks),
                subDomainLinks: getSubDomainLinks(listOfLinks, currentDir),
                files: getFiles(filterList(scrapedLinks, { currentDir, removeFiles: false })),
                hasText,
            };
        })
        .catch(error => ({ error }))
        .then(params => callBackFn(params));
}
