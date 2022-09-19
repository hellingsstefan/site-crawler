import { WEBSITE_HREF, SEARCH_STRING, c } from './config.js';
import { getDuration } from './utils.js';
import { searchToFile as writeToFile} from './writeToFile.js';
import { handleError, logErrors } from './errors.js';
import searchPage from './searchPage.js';
import filterList from './filter.js';
import getCurrentDir from './getCurrentDir.js';

console.log(`Searching ${c.green}${WEBSITE_HREF}${c.reset} for "${c.blue}${SEARCH_STRING}${c.reset}"\n`);

let searchedPages = [];
let pagesToSearch = [];
let errors = [];

function searchCallback(url, data) {
    if (data.error) {
        handleError(errors, data.error);
        data.sameDomainLinks = [];
        data.subDomainLinks = [];
    }

    const currentDir = getCurrentDir(url);
    const toSearch = [
        ...data.sameDomainLinks,
        ...data.subDomainLinks,
    ];

    searchedPages = [...searchedPages, url].sort();
    pagesToSearch = [...new Set([...pagesToSearch, ...filterList(toSearch, { currentDir })])]; // filtered and unique set
    pagesToSearch = pagesToSearch
        .filter(n => !searchedPages.includes(n)) // remove already searched
        .sort() // sort
    ;

    return data;
}

async function searchSite(url, text = '') {
    const timeStart = new Date();
    let timeEnd = timeStart;
    let duration = 0;

    const firstSearch = await searchPage(url, text, data => searchCallback(url, data));
    const crawlData = [];

    if (firstSearch.hasText) {
        console.log(`${c.bggreen}${c.black} Result found √ ${c.reset}`);
        crawlData.push({
            pageName: 'homepage',
            url: '/',
            ...firstSearch,
        });
    }

    pagesToSearch = [
        ...firstSearch.sameDomainLinks,
        ...firstSearch.subDomainLinks
    ];

    while (pagesToSearch.length !== 0) {
        const { pathname: pageName, href: pageUrl } = new URL(pagesToSearch[0]);

        try {
            const search = await searchPage(pageUrl, text, data => searchCallback(pageUrl, data));

            if (search.hasText) {
                console.log(`${c.bggreen}${c.black} Result found √ ${c.reset}`);
                crawlData.push({
                    pageName,
                    url: pageUrl,
                    ...search,
                });
            }
        } catch (error) {
            console.log(error);
        }

        console.log(`Pages to search: ${pagesToSearch.length}\t| Pages searched: ${searchedPages.length}\t| ${pageUrl}`);
    }

    console.log('Results:');
    console.log(`Found "${c.blue}${SEARCH_STRING}${c.reset}" on ${crawlData.length} page(s):\n`);
    crawlData.forEach(page => console.log(`\t${page.url}`));

    logErrors(errors);
    writeToFile(crawlData, errors);

    timeEnd = new Date();
    duration = getDuration(timeStart, timeEnd);

    console.log(`Done in ${duration}!`);
}

searchSite(WEBSITE_HREF, SEARCH_STRING);
