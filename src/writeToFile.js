import fs from 'fs';
import { WEBSITE_HREF, WEBSITE_DOMAIN_NAME, PATH } from './config.js';
import { printData, scrapedPages } from './index.js';

export default function writeToFile(data) {
    const allThirdPartyLinks = [...new Set( // make unique set
        data
            .filter(page => page.thirdPartyLinks.length > 0) // only pages with third party links
            .map(page => page.thirdPartyLinks) // extract thirdPartyLinks
            .flat() // flatten out array
            .sort() // sort
    )];

    const allSubDomainLinks = [...new Set( // make unique set
        data
            .filter(page => page.subDomainLinks.length > 0) // only pages with subdomain links
            .map(page => page.subDomainLinks) // extract subdomainLinks
            .flat() // flatten out array
            .sort() // sort
    )];

    try {
        let content = `Scrape of ${WEBSITE_DOMAIN_NAME} (${WEBSITE_HREF})\n\n\n`;

        content += printData(scrapedPages.sort(), "Total pages scraped");
        content += printData(allThirdPartyLinks, "Total external links");
        content += printData(allSubDomainLinks, "Total subdomain links");

        data.forEach(({ pageName, url, sameDomainLinks, samePageLinks, subDomainLinks, thirdPartyLinks }) => {
            content += `Page: ${pageName} (${url})`;
            content += printData(sameDomainLinks, "Links on the same domain");
            content += printData(samePageLinks, "Links pointing to the same page");
            content += printData(subDomainLinks, "Links on a subdomain");
            content += printData(thirdPartyLinks, "Third party links");
            content += `\n\n`;
        });

        fs.writeFileSync(PATH, content);
        console.log('File written successfully', PATH);
    } catch (error) {
        console.error(error);
    }
}
