import { Scale } from 'tonal'
import * as Tone from 'tone';

import { useState, useMemo, useEffect } from 'react'

import { tuning_options, scale_colors, key_list } from './resources/Data'
import { str_to_css_selector, calc_fretboard_data } from './resources/Utils'

import ControlPanel from './components/ControlPanel.jsx'
import Fretboard from './components/Fretboard'
import ScaleTable from './components/ScaleTable'

import "./styles/app.scss" 

// https://tonaljs.github.io/tonal/docs/

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
	
	// * * * SOUND SETTINGS * * *  
	const [soundState, setSoundState] = useState(true);
	const toggleSound = () => soundState(prevVal => !prevVal);

	// * * * SYNTH * * * 
	const synth = new Tone.Synth().toDestination();


	// * * *  TUNING * * * 
	const max_tuners = 9;
	const [currentTuning, setCurrentTuning] = useState(tuning_options.find(tuning => tuning.name === 'Half Step Down'));

	// * * * NUMBER FRETS * * *  
	const [numFrets, setNumFrets] = useState(13);
	const handleSetNumFrets = (newNumFrets) => {
		setNumFrets(prevNumFrets => (newNumFrets < 5 || newNumFrets > 25) ? prevNumFrets : newNumFrets);
	};

	// * * * SCALE KEY - set to first key in all_notes
	const [currentKey, setCurrentKey] = useState( 'E' );

	// * * * CURRENT SCALE - set to first scale in scale data
	const [currentScale, setCurrentScale] = useState('major pentatonic');
	const handleScaleSelection = (val) => setCurrentScale( val );

	// * * * NOTE TYPE * * *  
	const [noteType, setNoteType] = useState("notes");

	// * * * INTERFACE * * *  
	const [interfaceScheme, setInterfaceScheme] = useState("scheme-dark");

	const fretboardData = useMemo(()=> calc_fretboard_data(currentTuning, numFrets, currentKey, currentScale), [
		currentKey, 
		currentScale, 
		numFrets,
		currentTuning
	])

	//  * * *  Color Style Calculations * * *  
	// We're using useMemo to prevent the list from being recreated on every render
	const app_style_attr = useMemo(() => {
		const colors_obj = scale_colors.reduce( (acc, { colorname, color } ) => {
			acc[`--${colorname}`] = color;
			return acc;
		}, {})
	
		colors_obj["--primary-highlight-color"] = `var(--${str_to_css_selector(Scale.names().find(name => name === currentScale))})`
		return colors_obj
	})

	
	useEffect(()=> {
		// console.clear();
		console.log('Render App')

		// console.table({
		// 	'key': currentKey,
		// 	'scale_name': currentScale,
		// 	'scale': Scale.get(`${currentKey} ${currentScale}`).notes,
		// 	'tuning': currentTuning.notes
		// })		
		// console.log(is_note_in_scale('Abb', 'B#5 minor'))
	})
	


	return (
		<>
			<main 
				className={`
					app-main-container ${interfaceScheme} 
					current-scale--${ str_to_css_selector(Scale.names().find(name => name === currentScale)) }
				`}
				style={app_style_attr}
			>
				<h1 className="app-title">Fret<span className="app-title__white">Getter</span></h1>

				<ScaleTable 
					currentKey={currentKey} 
					currentScale={currentScale} 
				/>
				
				<Fretboard
					soundState
					fretboardData={fretboardData}
					currentTuning={currentTuning}
					numFrets={numFrets} 
					
					currentKey={currentKey}
					currentScale={currentScale} 

					noteType={noteType}
					interfaceScheme={interfaceScheme}

					synth={synth}
				/>

				<ControlPanel 
					keyList={key_list}
					numFrets={numFrets} handleSetNumFrets={handleSetNumFrets}
					currentKey={currentKey} setCurrentKey={setCurrentKey}
					noteType={noteType} setNoteType={setNoteType}

					currentTuning={currentTuning}
					setCurrentTuning={setCurrentTuning}
					maxTuners={max_tuners}

					interfaceScheme={interfaceScheme} setInterfaceScheme={setInterfaceScheme}
					currentScale={currentScale} handleScaleSelection={handleScaleSelection}
				/>
			</main>
		</>
	)
}