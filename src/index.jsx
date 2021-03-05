import { h, render } from 'preact';
import { useState, useRef } from 'preact/hooks';

import 'preact/devtools';
import 'preact/debug';

import FileSaver from 'file-saver';
import handleMap from './lib/map-handler'

import './index.css';

function App () {
	const [ map, setMap ] = useState(null);
	
	const inputRef = useRef(null)

	const saveFile = async (jsonPromise) => {
		const jsonData = await jsonPromise
		const jsonHeader = { type: "text/plain;charset=utf-8" }
		const dataBlob = new Blob([jsonData], jsonHeader);
		
		FileSaver.saveAs(dataBlob, "data.json")
	}
	
	const onDrop = (event) => {
		event.preventDefault()
    
		if (event.dataTransfer.files) {
			const [ file ] = event.dataTransfer.files
			const jsonPromise = handleMap(file)

			saveFile(jsonPromise)
		}
	}

	const onFileSelect = (event) => {
		if (event.target.files.length) {	
			const [ file ] = event.target.files
			const jsonPromise = handleMap(file)

			saveFile(jsonPromise)
		} else {
			setMap(null)
		}
	}

	const onClick = () => inputRef.current.click()

	return (
		<div class="app" ondrop={onDrop} ondragover={e => e.preventDefault()} onclick={onClick}>
			<p>Click anywhere in the page to browse for the map.</p>
			<p>You can also drag the DotA map to the screen.</p>
			<input type="file" value={map} ref={inputRef} onchange={onFileSelect} />
		</div>
	);
}

if (root) {
  render(<App />, root);
}