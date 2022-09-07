import { WEBSITE_HREF } from './config.js';
import filterList from './filter.js';
import scrapePage from './scrapePage.js';
import writeToFile from './writeToFile.js';

console.log(WEBSITE_HREF);

export let scrapedPages = [];
let pagesToScrape = [];

function scrapeCallback(url, data) {
    scrapedPages = [...scrapedPages, url].sort();
    pagesToScrape = [...new Set([...pagesToScrape, ...filterList(data.sameDomainLinks)])]; // filtered and unique set
    pagesToScrape = pagesToScrape
        .filter(n => !scrapedPages.includes(n)) // remove already scraped
        .sort() // sort
    ;

    return data;
}

export function printData(data, title) {
    const length = data.length;
    let content = '';

    content = `    ${title} (${length}):\n`;
    data.forEach(link => content += `        ${link}\n`);
    content += `\n`;

    return content;
}

function getDifferenceInSeconds(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);

    return diffInMs / 1000;
}

function getDuration(timeStart, timeEnd) {
    const time = getDifferenceInSeconds(timeStart, timeEnd);
    let duration = `${time} seconds!`;

    if (time > 60) {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;

        duration = `${minutes} minutes and ${seconds} seconds!`;
    }

    return duration;
}

async function crawlSite(url, write = false, log = false) {
    const timeStart = new Date();
    let timeEnd = timeStart;
    let duration = 0;

    const firstScrape = await scrapePage(url, data => data); // First run. Scrapes only the sameDomainLinks
    const crawlData = [{
        pageName: 'homepage',
        url: '/',
        sameDomainLinks: firstScrape.sameDomainLinks,
        samePageLinks: firstScrape.samePageLinks,
        subDomainLinks: firstScrape.subDomainLinks,
        thirdPartyLinks: firstScrape.thirdPartyLinks,
    }];

    pagesToScrape = [...firstScrape.sameDomainLinks];

    while (pagesToScrape.length !== 0) {
        try {
            const { pathname: pageName, href: pageUrl } = new URL(pagesToScrape[0]);
            const linkLists = await scrapePage(pageUrl, data => scrapeCallback(pageUrl, data));

            crawlData.push({
                pageName,
                url: pageUrl,
                ...linkLists,
            });
        } catch (error) {
            console.log(error);
        }

        console.log('Pages to scrape: ', pagesToScrape.length, ' | Pages scraped: ', scrapedPages.length);
    }

    if (write) {
        writeToFile(crawlData);
    }

    timeEnd = new Date();
    duration = getDuration(timeStart, timeEnd);

    console.log(`Done in ${duration}!`);

}

crawlSite(WEBSITE_HREF, true);
