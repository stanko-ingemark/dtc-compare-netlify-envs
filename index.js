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
function getComp(first, second) {
    const [d1,d2] = [first.file, second.file].map(getDataFromFile);
    const allKeys = _.uniq(Object.keys(d1).concat(Object.keys(d2)));
    allKeys.sort();
    let resultData = allKeys.map(k => {
        return [k, getVal(d1,k), getVal(d2,k)];
    });
    if (CONFIG.diffOnly) {
        resultData = resultData.filter(row => row[1] != row[2]);
    }
    const resultString = [["KEY", first.label, second.label]].concat(resultData).map(r => r.join("\t")).join("\n");
    return resultString;
}

console.log(getComp(
    ...CONFIG.envFiles,
))