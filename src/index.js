const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');
const {Parser} = require('json2csv');

let dados = [];

async function extracao(site) {
   const html = await request.get(site);
   const $ = await cheerio.load(html);

   for (i=2; i<1003;i++) {
      let distribuidora = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text().trim();
      let codigo = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(2)`).text().trim();
      let titular = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text().trim();
      let classe = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(4)`).text().trim();
      let subgrupo = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(5)`).text().trim();
      let modalidade = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(6)`).text().trim();
      let qtdcredito = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(7)`).text().trim();
      let municipio = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(8)`).text().trim();
      let uf = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(9)`).text().trim();
      let cp = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(10)`).text().trim();
      let data = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(11)`).text().trim();
      let fonte = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(12)`).text().trim();
      let potencia = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(13)`).text().trim();
      let modulo = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(14)`).text().trim();
      let inversores = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(15)`).text().trim();
      let arranjo = $(`body > table:nth-child(4) > tbody > tr:nth-child(1) > td > table:nth-child(4) > tbody > tr:nth-child(${i}) > td:nth-child(16)`).text().trim();

      dados.push({
         distribuidora,
         codigo,
         titular,
         classe,
         subgrupo,
         modalidade,
         qtdcredito,
         municipio,
         uf,cp,
         data,
         fonte,
         potencia,
         modulo,
         inversores,
         arranjo
      });

      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(dados);
      console.log(dados);
      fs.writeFileSync('./dados-aneel.csv', csv, 'utf8');
      await demora();
   }

}

//delay no bot (quantos milesegudos pode ser retardado o scraping)
async function demora (){
   await sleep(1000);
   await console.log(`Passado 1 segundo ... >

   `)
}

async function sleep(ml){
   return new Promise (resolve => setTimeout(resolve, ml))
}

let totpgpai = 143
let count = 1

async function extraitodas(){
   while(count <= totpgpai) {
      const urlFilhos = 'http://www2.aneel.gov.br/scg/gd/gd_fonte_detalhe.asp?tipo=12&pagina=' + count;
      await extracao(urlFilhos);
      count++
   }

}
extraitodas();
//extracao('http://www2.aneel.gov.br/scg/gd/gd_fonte_detalhe.asp?tipo=12&pagina=1')

