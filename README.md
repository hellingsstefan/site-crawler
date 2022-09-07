# Site-crawler

Nodejs script that crawls the site you enter and lists all links it can find.
It'll go through all pages it finds on the same domain.

Uses `axios` for fetching the pages.
Uses `jsdom` for parsing the html response.

## Installation
```npm i```

## Usage
```npm run start https://www.my-website.com```
