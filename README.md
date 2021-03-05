# WC3 DotA Data Extractor

[![Netlify Status](https://api.netlify.com/api/v1/badges/f6197106-5484-435b-9ae6-b7465a9709ba/deploy-status)](https://app.netlify.com/sites/wc3-dota-data-extractor/deploys)

Extracts some data from input DotA map and outputs it in JSON format. Currently only tested on [v7.00e4](https://www.epicwar.com/maps/308663/) and only extracts data of heroes.

Data extractor client demo deployed on Netlify here: https://wc3-dota-data-extractor.netlify.app/

## Scripts

Run `npm install` first before executing the following scripts.

### `npm start`

Runs the app in the development mode. Open http://localhost:5000 to view it in the browser.
Drag the w3x map or click the screen to browse for the map and it will generate and download the JSON file.

### `npm run build`

Builds the data extractor client for production to the `build/` folder.

### `npm run extract input_map_path [json_output_dir]`

Extracts data from input DotA map. Output JSON file directory defaults to the same folder if no output dir provided.
Only works if you put `"type": "module"` in `package.json`, but will break snowpack in return (`npm start` will fail).
Waiting for snowpack to support `"type"= "module"` so that both will work without the other breaking.

## Credits

[flowtsohg (GhostWolf)](https://github.com/flowtsohg) - I used some parsers on his
[mdx-m3-viewer](https://github.com/flowtsohg/mdx-m3-viewer) library as reference on handling certain file formats.