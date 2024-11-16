const FILES = {
    MDA_UAT: "./account.stage.env",
    MDA_RC: "./account.rc.env",
    WWW_UAT: "./www.stage.env",
    WWW_RC: "./www.rc.env"
}

module.exports = {
    envFiles: [
        {file: FILES.WWW_UAT, label: "WWW_UAT"},
        {file: FILES.WWW_RC, label: "WWW_RC"},
    ],
    diffOnly: true,
    missingOnly: false,
    missingValueText: '[<<<< MISSING >>>>]'
}