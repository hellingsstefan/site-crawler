import fs from 'fs';
import { WEBSITE_HREF, WEBSITE_DOMAIN_NAME, PATH, PATH_SEARCH, SEARCH_STRING } from './config.js';
import { printData } from './utils.js';

export function scrapeToFile(data, scrapedPages, errors) {
    const allThirdPartyLinks = [...new Set( // make unique set
        data
            .filter(page => page.thirdPartyLinks.length > 0) // only pages with third party links
            .map(page => page.thirdPartyLinks) // extract thirdPartyLinks
            .flat() // flatten out array
            .sort()
    )];

    const allSubDomainLinks = [...new Set( // make unique set
        data
            .filter(page => page.subDomainLinks.length > 0) // only pages with subdomain links
            .map(page => page.subDomainLinks) // extract subdomainLinks
            .flat() // flatten out array
            .sort()
    )];

    const allFiles = [...new Set(data
        .filter(page => (
            page.spreadsheets.length > 0
            || page.documents.length > 0
            || page.images.length > 0
            || page.media.length > 0
            || page.pdf.length > 0
        ))
        .map(page => ([
            ...page.spreadsheets,
            ...page.documents,
            ...page.images,
            ...page.media,
            ...page.pdf,
        ]))
        .flat()
        .sort()
    )];

    try {
        let content = `Scrape of ${WEBSITE_DOMAIN_NAME} (${WEBSITE_HREF})\n\n\n`;

        content += printData(scrapedPages.sort(), "Total pages scraped");
        content += printData(allThirdPartyLinks, "Total external links");
        content += printData(allSubDomainLinks, "Total subdomain links");
        content += printData(allFiles, "Total files found");

        data.forEach(dataSet => {
            content += `Page: ${dataSet.pageName} (${dataSet.url})`;
            content += printData(dataSet.sameDomainLinks, "Links on the same domain");
            content += printData(dataSet.samePageLinks, "Links pointing to the same page");
            content += printData(dataSet.subDomainLinks, "Links on a subdomain");
            content += printData(dataSet.thirdPartyLinks, "Third party links");
            content += printData(dataSet.spreadsheets, "Spreadsheets"),
            content += printData(dataSet.documents, "Documents"),
            content += printData(dataSet.images, "Images"),
            content += printData(dataSet.media, "Media"),
            content += printData(dataSet.pdf, "PDFs"),
            content += `\n\n`;
        });

        content += writeErrors(errors);

        fs.writeFileSync(PATH, content);
        console.log('File written successfully', PATH);
    } catch (error) {
        console.error(error);
    }
}

export function searchToFile(data, errors) {
    try {
        let content = `Searchresults for "${SEARCH_STRING}" on ${WEBSITE_DOMAIN_NAME} (${WEBSITE_HREF})\n`;
        content += `Searched ${data.length} page(s)\n\n`;
        content += `Query found on:\n`;

        data.forEach(({ url }) => {
            content += `\t${url}\n`;
        });

        content += writeErrors(errors);

        fs.writeFileSync(PATH_SEARCH, content);
        console.log('\nFile written successfully', PATH_SEARCH);
    } catch (error) {
        console.error(error);
    }
}

function writeErrors(errors) {
    let content = `\n\nErrors:\n`;
    errors.forEach(error => {
        content += `\t${error.errorCode}\t| ${error.responseStatus} - ${error.responseStatusText}\t| ${error.errorPage}\n`;
    });

    return content;
}
