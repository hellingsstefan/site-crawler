export const ADDRESS = process.argv.slice(2)[0];
export const WEBSITE = new URL(ADDRESS);
export const WEBSITE_HREF = WEBSITE.href;
export const WEBSITE_ORIGIN = WEBSITE.origin;
export const WEBSITE_DOMAIN_NAME = WEBSITE.host.split('.')[1];
export const DIR = './scrape-data/';
export const FILENAME = `${WEBSITE_DOMAIN_NAME}.txt`;
export const PATH = `${DIR}${FILENAME}`;
