"use strict";

const fs = require('fs');

try {
    const data = fs.readFileSync('public/games.json', 'utf8');
    const minified = data.replace(/\n|\s{2,}/g, '');
    console.log(minified);
    fs.writeFileSync('public/games_min.json', minified);
   } catch (err) {
    console.error(err);
}