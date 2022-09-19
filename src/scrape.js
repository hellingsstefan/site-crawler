import { WEBSITE_HREF } from './config.js';
import { getDuration } from './utils.js';
import { scrapeToFile as writeToFile} from './writeToFile.js';
import { handleError, logErrors } from './errors.js';
import filterList from './filter.js';
import scrapePage from './scrapePage.js';
import getCurrentDir from './getCurrentDir.js';

console.log(WEBSITE_HREF);

export let scrapedPages = [];
let pagesToScrape = [];
let errors = [];

function scrapeCallback(url, data) {
    if (data.error) {
        handleError(errors, data.error);
        data.sameDomainLinks = [];
        data.samePageLinks = [];
        data.sameDomainLinks = [];
        data.subDomainLinks = [];
        data.thirdPartyLinks = [];
        data.spreadsheets = [];
        data.documents = [];
        data.images = [];
        data.media = [];
        data.pdf = [];
    }

    const currentDir = getCurrentDir(url);
    const toScrape = [
        ...data.sameDomainLinks,
    ];

    scrapedPages = [...scrapedPages, url].sort();
    pagesToScrape = [...new Set([...pagesToScrape, ...filterList(toScrape, { currentDir })])]; // filtered and unique set
    pagesToScrape = pagesToScrape
        .filter(n => !scrapedPages.includes(n)) // remove already scraped
        .sort() // sort
    ;

    return data;
}

async function crawlSite(url, write = true) {
    const timeStart = new Date();
    let timeEnd = timeStart;
    let duration = 0;

    const firstScrape = await scrapePage(url, data => data); // First run. Scrapes only the sameDomainLinks
    const crawlData = [{
        pageName: 'homepage',
        url: '/',
        ...firstScrape,
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

    logErrors(errors);

    if (write)
        writeToFile(crawlData, scrapedPages, errors);

    timeEnd = new Date();
    duration = getDuration(timeStart, timeEnd);

    console.log(`Done in ${duration}!`);

}

crawlSite(WEBSITE_HREF, true);
