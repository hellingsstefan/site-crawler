// TODO: Setup yargs
// import yargs from 'yargs';

// export const argv = yargs
//     .command('allowSubDomain', 'Also follow each subdomain link that is found', {
// })

export const ADDRESS = process.argv.slice(2)[0];
export const SEARCH_STRING = process.argv.slice(2)[1];

if (!ADDRESS)
    throw new Error('\x1b[31m\x1b[40m No website url found! Insert a url! \x1b[0m\n');

export const WEBSITE = new URL(ADDRESS);
export const WEBSITE_HREF = WEBSITE.href;
export const WEBSITE_HOST = WEBSITE.host;
export const WEBSITE_ORIGIN = WEBSITE.origin;
export const WEBSITE_DOMAIN_NAME = WEBSITE.host.split('.')[1];

export const DIR = './scrape-data/';
export const DIR_SEARCH = './search-data/';
export const FILENAME = `${WEBSITE_HOST}.txt`;
export const PATH = `${DIR}${FILENAME}`;
export const PATH_SEARCH = `${DIR_SEARCH}${FILENAME}`;

export const c = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",

    bgblack: "\x1b[40m",
    bgred: "\x1b[41m",
    bggreen: "\x1b[42m",
    bgyellow: "\x1b[43m",
    bgblue: "\x1b[44m",
    bgmagenta: "\x1b[45m",
    bgcyan: "\x1b[46m",
    bgwhite: "\x1b[47m",
}
