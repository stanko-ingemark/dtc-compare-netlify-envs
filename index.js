const fs = require('fs');
const path = require('path');
const _ = require('lodash');
if (!fs.existsSync(path.resolve(__dirname, 'config.js'))) {
    console.error('Missing config.js');
    process.exit(1);
}
const CONFIG = require('./config.js');

function getDataFromFile(fn){
    const filePath = path.resolve(__dirname, fn);
    const rawData = fs.readFileSync(filePath).toString();
    const lines = rawData.split("\n").map(ln => ln.trim()).filter(l => !!l);
    const data = lines.map(ln => ln.split('=').map(v => v.trim())).filter(line => line.length === 2);
    const result = {};
    data.forEach(([key, value]) => {
        result[key] = value;
    })
    return result;
}
const getVal = (d, k) => {
    if (k in d) return d[k];
    return CONFIG.missingValueText;
}
function getComp(...envFiles) {
    const envData = envFiles.map(e => e.file).map(getDataFromFile);
    const allKeys = _.uniq(envData.reduce(
        (acc, data) => acc.concat(Object.keys(data)), []
    ));
    allKeys.sort();
    let resultData = allKeys.map(k => {
        return [k, ...envData.map(d => getVal(d,k))];
    });
    if (CONFIG.diffOnly && (envFiles.length > 1)) {
        resultData = resultData.filter(row => _.uniq(row.slice(1)).length > 1);
    }
    if (CONFIG.missingOnly && (envFiles.length > 1)) {
        resultData = resultData.filter(row => !!row.find(val => val === CONFIG.missingValueText));
    }
    
    const resultString = [["KEY", ...envFiles.map(e => e.label)]].concat(resultData).map(r => r.join("\t")).join("\n");
    return resultString;
}

console.log(getComp(
    ...CONFIG.envFiles,
))