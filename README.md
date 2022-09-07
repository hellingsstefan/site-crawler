# Site-crawler

Nodejs script that crawls the site you enter and lists all links it can find.
It'll go through all pages it finds on the same domain.

Afterwards, a `.txt` file is written and placed inside the `scrape-data` folder.

Uses `axios` for fetching the pages and `jsdom` for parsing the html response.

## Installation
```npm i```

## Usage
```npm run start https://www.my-website.com```
