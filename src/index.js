const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const {Parser} = require('json2csv');

async function extracao(site) {
   const html = await request.get(site);
   const $ = await cheerio.load(html);
   let name = $('body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(1)').text().trim();
  // let endereco = $('#rl_ist0 > div.rl_tile-group > div.rlfl__tls.rl_tls > div:nth-child(1) > div > div.uMdZh.rl-qs-crs-t.mnr-c > div > a > div > span > div:nth-child(2) > span').text();
   console.log(name)
}

extracao('https://www2.aneel.gov.br/scg/gd/gd_fonte_detalhe.asp?Tipo=10')