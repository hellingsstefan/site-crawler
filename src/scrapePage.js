import axios from 'axios';
import { JSDOM } from 'jsdom';
import { getSamePageLinks, getSameDomainLinks, getSubDomainLinks, getThirdPartyDomainLinks } from './getLinks.js';
import filterList from './filter.js';

export default async function scrapePage(url, callBackFn = () => { }) {
    console.log('Scraping page: ', url);

    return axios
        .get(url)
        .then(response => {
            const dom = new JSDOM(response.data);
            const document = dom.window.document;
            const scrapedLinks = [...document.querySelectorAll('a[href]')].map(a => a.href);
            const listOfLinks = filterList(scrapedLinks);

            return {
                sameDomainLinks: getSameDomainLinks(listOfLinks),
                subDomainLinks: getSubDomainLinks(listOfLinks),
                thirdPartyLinks: getThirdPartyDomainLinks(listOfLinks),
                samePageLinks: getSamePageLinks(filterList(scrapedLinks, false)),
            };
        })
        .catch(error => console.log(error))
        .then(params => callBackFn(params));
}
