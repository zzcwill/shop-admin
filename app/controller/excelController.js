const xlsx = require('node-xlsx').default;
const path = require('path');
const fs = require('fs');
const contentDisposition = require('content-disposition');
const lodash = global.help.lodash;
const logger = global.help.logger;
const checkParam = global.help.checkParam;
const { ParameterException } = global.help.httpCode;

const { resOk } = global.help.resData;


module.exports = {
  get: async (ctx, next) => {
    ctx.set('Content-Disposition', contentDisposition('excel.xlsx'));

    var url = path.resolve(__dirname, '../public/demo.xlsx');

    var excelData = xlsx.parse(fs.readFileSync(url));

    // console.info(excelData[0].data[0])
    var data1 = [
      'zzc', '18042434282', '10', '1000', '2021-02-22'
    ]

    excelData[0].data.push(data1);

    const options = {'!cols': [{ wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 },{ wch: 25 } ]};    
    var buffer = xlsx.build([{ name: excelData[0].name, data: excelData[0].data }],options);
    ctx.end(buffer);
    
  },
  get2: async (ctx, next) => {
    var url = '/demo.xlsx'
    ctx.redirect(url)
  }
}