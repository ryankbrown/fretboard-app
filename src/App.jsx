import { useState, useMemo } from 'react'
import { Note, Scale, Key } from 'tonal'
import { tuning_options, scale_colors, key_list } from './resources/Data'
import { str_to_css_selector } from './resources/Utils'

import ControlPanel from './components/ControlPanel.jsx'
// import Fretboard from './components/Fretboard'


import "./styles/app.scss" 
// https://tonaljs.github.io/tonal/docs/

// Test commit message
// useState
// Usage: const [state, setState] = useState(initialState);
// Purpose: used to manage local component state.
// Behavior: useState returns a state variable and a function to update that state. The state is preserved across re-renders, and updating the state triggers a re-render of the component.

// useEffect
// Usage: useEffect(() => { effect }, [dependencies]);
// Purpose: To handle side effects like data fetching, subscriptions, or manually changing the DOM.
// Behavior: useEffect runs after the render is committed to the screen. It can optionally clean up after itself by returning a cleanup function. The effect runs again if any of the dependencies change.

// useMemo
// Usage: const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// Purpose: To optimize performance by avoiding expensive calculations on every render.
// Behavior: returns a memoized value that is only recalculated if any of the dependencies change. It helps to prevent unnecessary calculations in each render cycle.

export default function App() {

	// * * *  TUNING * * * 
	const max_tuners = 9;

	const [currentTuning, setCurrentTuning] = useState(tuning_options[0]);

	// // * * * NUMBER FRETS * * *  
	const [numFrets, setNumFrets] = useState(13);
	const handleSetNumFrets = (newNumFrets) => {
		setNumFrets(prevNumFrets => (newNumFrets < 5 || newNumFrets > 25) ? prevNumFrets : newNumFrets);
	};

	// * * * SCALE KEY - set to first key in all_notes
	const [scaleKey, setScaleKey] = useState( 'E' );

	// * * * CURRENT SCALE - set to first scale in scale data
	const [currentScale, setCurrentScale] = useState(Scale.names()[0]);
	const handleScaleSelection = (val) => setCurrentScale( val );

	// // * * * NOTE TYPE * * *  
	const [noteType, setNoteType] = useState("degrees");

	// // * * * INTERFACE * * *  
	const [interfaceScheme, setInterfaceScheme] = useState("scheme-dark");


	// // * * *  CALCULATED DATA  * * *  
	// const scaleData = useMemo(()=> calcScaleData(scaleKey, currentScale), [
	// 	scaleKey, 
	// 	currentScale, 
	// 	numFrets,
	// 	currentTuning
	// ])

	// const fretboardData = useMemo(()=> calcFretboard(currentTuning, numFrets, scaleKey, scaleData), [
	// 	scaleKey, 
	// 	currentScale, 
	// 	numFrets,
	// 	currentTuning
	// ])


	// //  * * *  Get Key List * * *  

	const app_style_attr = scale_colors.reduce( (acc, { colorname, color } ) => {
		acc[`--${colorname}`] = color;
		return acc;
	}, {})

	console.log('Render App')


	return (
		<>
			<main 
				className={`
					app-main-container ${interfaceScheme} 
					current-scale--${ str_to_css_selector(Scale.names().find(name => name === currentScale)) }
				`}
				style={
						scale_colors.reduce( (acc, { colorname, color } ) => {
						acc[`--${colorname}`] = color;
						return acc;
					}, {})
				}
			>
				<h1 className="app-title">Fret<span className="app-title__white">Getter</span></h1>
				{/* <figure className="info-section">
					<table> 
						<thead>
							<tr>
								<th className="info-section__title" >{ scaleKey } {currentScale}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row" className="info-section__header">Scale Notes</th>
								{
									Object.values(scaleData).map((n, i) => <td key={`info-section__note-${i}`}>{n.note}</td>)
								}
							</tr>
							<tr>
								<th scope="row" className="info-section__header">Scale Degrees</th>
								{
									Object.values(scaleData).map((n, i) => <td key={`info-section__degree-${i}`}>{n.degree}</td>)
								}
							</tr>
						</tbody>
					</table>
				</figure> */}
				
				{/* <Fretboard
					// tuningData={tuningData}
					currentTuning={currentTuning}
					numFrets={numFrets} 
					
					scaleKey={scaleKey}
					currentScale={currentScale} 
					noteType={noteType}
					interfaceScheme={interfaceScheme}

					fretboardData={fretboardData}
				/> */}

				 <ControlPanel 
					keyList={key_list}
					numFrets={numFrets} handleSetNumFrets={handleSetNumFrets}
					scaleKey={scaleKey} setScaleKey={setScaleKey}
					noteType={noteType} setNoteType={setNoteType}

					currentTuning={currentTuning}
					// handleSetCurrentTuning={handleSetCurrentTuning}
					setCurrentTuning={setCurrentTuning}
					maxTuners={max_tuners}

					interfaceScheme={interfaceScheme} setInterfaceScheme={setInterfaceScheme}
					currentScale={currentScale} handleScaleSelection={handleScaleSelection}
				/>
			</main>
		</>
	)
}