# dtc-compare-netlify-envs

Takes list of netlify `.env` files ("Environment" variables section on Netlify UI, select context, click "copy", paste to a file). Outputs a table (CSV, easy to paste in excel/google sheets) with first column containing sorted environment variable names, and each of the other column represents values from one of the `.env` files.
This makes it easier to compare environments for debugging/preparing deployment etc.

## How to use

1. Install dependencies: `npm install`
2. Create a `config.js` file (see `config.example.js` for example and options)
3. `npm run compare`