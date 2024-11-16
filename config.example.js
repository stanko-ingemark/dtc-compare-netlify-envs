module.exports = {
    envFiles: [
        {
            file: "./www.stage.env",  // relative (from script root) path to environment file, required
            label: "WWW_UAT" // how the column will be labeled. Optional (uses file value if not present)
        },
        {
            file: "./www.rc.env",
            label: "WWW_RC"
        },
    ],
    diffOnly: true, // if true, shows only environment variables which differ across env files
    missingOnly: false, // if true, shows only environment variables 
                        // which have missing value in at least one environment
    missingValueText: '[<<<< MISSING >>>>]' // if environment variable is missing from the environment
                                            // this value will be displayed 
                                            // (easier to spot than empty string)
}