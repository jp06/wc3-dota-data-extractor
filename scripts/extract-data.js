/**
 * Also parses and extracts data from input DotA map, only ran as an npm script
 * Only works if you put "type": "module" in `package.json`, which will break snowpack
 * Waiting for snowpack to support "type"="module" so that both will work without the other breaking
 * @param {string} inputPath Path of the DotA map
 * @param {string} outputDir Output directory of the generated `data.json`
 * @returns {File} The JSON file containing the parsed data
 */

import fs from 'fs'
import path from 'path'

import handleMap from '../src/common/map-handler.js'

(async () => {
	try {
		const args = process.argv.slice(2);
		
		if (args.length < 1 || args.length > 2) {
			throw "Invalid number of arguments"
		}
	
		const [ inputMap, outputDir ] = args
		
		const outputPath = path.format({ 
			dir: outputDir || path.dirname(inputMap), 
			base: 'data.json' 
		})

		const buffer = fs.readFileSync(inputMap)
		const data = await handleMap(buffer)

		fs.writeFileSync(outputPath, data)

		console.log("Map data successfully parsed")
	} catch (e) {
		console.error(e)
	}
})()