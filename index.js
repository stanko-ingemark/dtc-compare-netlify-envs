const fs = require('fs');
const _ = require('lodash');


const FILES = {
    MDA_UAT: "account.stage.env",
    MDA_RC: "account.rc.env",
    WWW_UAT: "www.stage.env",
    WWW_RC: "www.rc.env"
}

function getDataFromFile(fn){
    const rawData = fs.readFileSync(fn).toString();
    const lines = rawData.split("\n").map(ln => ln.trim()).filter(l => !!l);
    const data = lines.map(ln => ln.split('=').map(v => v.trim()));
    const result = {};
    data.forEach(([key, value]) => {
        result[key] = value;
    })
    return result;
}
const getVal = (d, k) => {
    if (k in d) return d[k];
    return '<<<< MISSING >>>>';
}
function getComp(first, second, options = {}) {
    const [d1,d2] = [first.file, second.file].map(getDataFromFile);
    const allKeys = _.uniq(Object.keys(d1).concat(Object.keys(d2)));
    allKeys.sort();
    let resultData = allKeys.map(k => {
        return [k, getVal(d1,k), getVal(d2,k)];
    });
    if (options.diffOnly) {
        resultData = resultData.filter(row => row[1] != row[2]);
    }
    const resultString = [["KEY", first.label, second.label]].concat(resultData).map(r => r.join("\t")).join("\n");
    return resultString;
}

console.log(getComp(
    {file: FILES.WWW_UAT, label: "WWW_UAT"},
    {file: FILES.WWW_RC, label: "WWW_RC"},
    {diffOnly: true}
))