import { Scale } from 'tonal'
import * as Tone from 'tone';



import { useState, useMemo, useEffect } from 'react'

import { tuning_options, key_list } from './resources/Data'
import { change_str_case, calc_fretboard_data, calc_color, interval_to_degree, useLocalStorage } from './resources/Utils'

import ControlPanel from './components/ControlPanel'
import ControlPanelIcon from "./components/ControlPanelIcon";
import Fretboard from './components/Fretboard'
import ScaleTable from './components/ScaleTable'

// import "./styles/app.scss" 

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
	const [soundState, setSoundState] = useLocalStorage('fretboard-sound-state', true);
	const toggleSound = () => setSoundState(prevVal => !prevVal);

	// * * * SYNTH * * * 
	const synth = new Tone.Synth().toDestination();

	// const synth = new Tone.FMSynth({
	// 	harmonicity: 3.01,
	// 	modulationIndex: 14,
	// 	oscillator: { type: "triangle" },
	// 	envelope: {
	// 	  attack: 0.01,
	// 	  decay: 0.1,
	// 	  sustain: 1.0,
	// 	  release: 1.2,
	// 	},
	// 	modulation: { type: "square" },
	// 	modulationEnvelope: {
	// 	  attack: 0.02,
	// 	  decay: 0.2,
	// 	  sustain: 0.1,
	// 	  release: 0.5,
	// 	}
	//   }).toDestination();

	// * * *  TUNING * * * 
	const max_tuners = 9;
	const [currentTuning, setCurrentTuning] = useLocalStorage('fretboard-current-tuning', tuning_options.find(tuning => tuning.name === 'Half Step Down'));

	// * * * NUMBER FRETS * * *  
	const [numFrets, setNumFrets] = useLocalStorage('fretboard-num-frets', 13);
	const handleSetNumFrets = (newNumFrets) => {
		setNumFrets(prevNumFrets => (newNumFrets < 5 || newNumFrets > 25) ? prevNumFrets : newNumFrets);
	};

	// * * * SCALE KEY - set to first key in all_notes
	const [currentKey, setCurrentKey] = useLocalStorage('fretboard-current-key', 'E');

	// * * * CURRENT SCALE - set to first scale in scale data
	const [currentScale, setCurrentScale] = useLocalStorage('fretboard-current-scale', 'major');

	// * * * NOTE TYPE * * *  
	const [noteType, setNoteType] = useLocalStorage('fretboard-note-type', 'notes');

	// * * * INTERFACE * * *  
	const [interfaceScheme, setInterfaceScheme] = useLocalStorage('fretboard-interface-scheme', 'scheme-dark');

	const [ highlightNotes, setHighlightNotes ] = useState([]);

	const [ showNoteOctaves, setShowNoteOctaves ] = useLocalStorage('fretboard-show-note-octaves', true);


	const fretboardData = useMemo(()=> calc_fretboard_data(currentTuning, numFrets, currentKey, currentScale), [
		currentKey, 
		currentScale, 
		numFrets,
		currentTuning
	])


	const scaleData = useMemo(()=> Scale.get(`${currentKey} ${currentScale}`), [currentKey, currentScale]);

	const scaleDegreeNotes = useMemo(()=> {
		return scaleData.notes.map((n, i) => {
			return {
				note: n,
				degree: interval_to_degree(scaleData.intervals[i])
			}
		});
	}, [scaleData]);
	

	const color_scheme = calc_color( currentScale );

	const app_main_container_styles = 
		`w-full h-full grid gap-2 overflow-hidden grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] [grid-template-areas:'header_header''scaletable_fretboard'] or-sm:grid-cols-[min-content_1fr_1fr] or-sm:[grid-template-areas:'header_header_controlPanel''scaletable_fretboard_controlPanel'] or-ch:h-full or-ch:[grid-template-areas:'header_scaletable''fretboard_fretboard'_'controlPanel_controlPanel'] or-ch:grid-cols-[1.2fr_.8fr] or-ch:grid-rows-[auto_1fr_min-content]
		`
	
	return (
		<>
			<main 
				className={`app-main-container ${interfaceScheme} current-scale--${ change_str_case( currentScale, 'css' ) }
${app_main_container_styles}
				`}
				style={{ 
					['--primary-highlight-color'] : color_scheme.main,
					['--primary-highlight-dark-color'] : color_scheme.dark
				}}
				onClick={(e) => {
					console.log(e.target)
				}}
			>

				<h1 className="app-title text-2xl font-extrabold m-0 uppercase text-[var(--primary-highlight-color)] [grid-area:header] font-integral
				or-sm:text-4xl 
				or-ch:text-6xl">Fret<span className="app-title__white text-[var(--primary-light-text-color)]">Finder</span>
				</h1>

				<ScaleTable 
					currentKey={currentKey} 
					currentScale={currentScale} 
					synth={synth}
					scaleData={scaleData}
					scaleDegreeNotes={scaleDegreeNotes}

					highlightNotes={highlightNotes}
					setHighlightNotes={setHighlightNotes}
				/>
				<ControlPanelIcon />

				{/* <div className="highlight-notes-container">
					<h3>Highlighted Notes</h3>
					{
					highlightNotes && highlightNotes.map((note, index) => (
						<div key={index} className="highlight-note">{note}</div>
					))}
				</div> */}
				
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

					highlightNotes={highlightNotes}
					setHighlightNotes={setHighlightNotes}

					showNoteOctaves={showNoteOctaves}
					setShowNoteOctaves={setShowNoteOctaves}
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
					currentScale={currentScale} setCurrentScale={setCurrentScale}
					scaleData={scaleData}
					scaleDegreeNotes={scaleDegreeNotes}
					
					showNoteOctaves={showNoteOctaves}
					setShowNoteOctaves={setShowNoteOctaves}
				/>
			</main>
		</>
	)
}