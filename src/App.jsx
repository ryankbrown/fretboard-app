// App.jsx

import { Scale, Interval } from 'tonal'
import * as Tone from 'tone';



import { useState, useMemo, useEffect } from 'react'

import { tuning_options, key_list } from './resources/Data'
import { change_str_case, calc_fretboard_data, calc_color, interval_to_degree } from './resources/Utils'

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

	
	// console.log( Scale.get('C chromatic').intervals )
	
	// * * * SOUND SETTINGS * * *  
	const [soundState, setSoundState] = useState(true);
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
	const [currentTuning, setCurrentTuning] = useState(tuning_options.find(tuning => tuning.name === 'Standard'));

	// * * * NUMBER FRETS * * *  
	const [numFrets, setNumFrets] = useState(13);
	const handleSetNumFrets = (newNumFrets) => {
		setNumFrets(prevNumFrets => (newNumFrets < 5 || newNumFrets > 25) ? prevNumFrets : newNumFrets);
	};

	// * * * SCALE KEY - set to first key in all_notes
	const [currentKey, setCurrentKey] = useState('E');

	// * * * CURRENT SCALE - set to first scale in scale data
	const [currentScale, setCurrentScale] = useState('major');


	// * * * SCALE DATA * * *
	const scaleData = useMemo(()=>  Scale.get(`${currentKey} ${currentScale}`), [currentKey, currentScale]);

	// * * * SCALE DEGREE NOTES * * *
	const scaleDegreeNotes = useMemo(()=> {
		return scaleData.notes.map((n, i) => {
			return {
				note: n,
				degree: interval_to_degree(scaleData.intervals[i]),
				interval: scaleData.intervals[i],
				semitone: i
			}
		});
	}, [scaleData]);


	// * * * CUSTOM SCALE MODE * * * 
	// This is a boolean that determines if the user is in custom scale mode
	// If true, the user can modify the scale by enabling and disabling intervals
	// If false, the user can only select from the predefined scales
	const [isCustomScaleMode, setIsCustomScaleMode] = useState(false);


	// This object template will be used to indicate which intervals are enabled in a predefined or custom scale
	const createBlankIntervalTemplate = ()=> {
		return {
			'1P' : true,
			'2m' : false,
			'2M' : false,
			'3m' : false,
			'3M' : false,
			'4P' : false,
			'Tri' : false,
			'5P' : false,
			'6m' : false,
			'6M' : false,
			'7m' : false,
			'7M' : false
		}
	}

	// * * * CUSTOM MODIFIED SCALE * * *
	// This is the state object that keeps track of which intervals are enabled and which are disabled.
	const [customScaleIntervals, setCustomScaleIntervals] = useState(createBlankIntervalTemplate())


	// This function resets the custom scale to the current scale
	// It is used to reset the custom scale to the current scale when the user is not in custom scale mode
	const resetCustomScaleToCurrent = ()=> {
		if (scaleData && scaleData.intervals) {
			// Create a blank interval template
			const blank_interval_template = createBlankIntervalTemplate()

			// Enable only the intervals in current scale
			scaleData.intervals.forEach(interval => {
				if (interval === '4A' || interval === '4d') {
					blank_interval_template['Tri'] = true;
				} else {
					blank_interval_template[interval] = true;
				}
			});
			setCustomScaleIntervals(blank_interval_template)
		}
	}

	
	


	// * * * FRETBOARD DATA * * *
	const fretboardData = useMemo(()=> calc_fretboard_data(currentTuning, numFrets, currentKey, currentScale), [
		currentKey, 
		currentScale, 
		numFrets,
		currentTuning
	])


	// * * * NOTE TYPE * * *  
	const [noteType, setNoteType] = useState('notes');

	// * * * INTERFACE * * *  
	const [ interfaceScheme, setInterfaceScheme ] = useState('scheme-dark');
	const [ highlightNotes, setHighlightNotes ] = useState([]);
	const [ showNoteOctaves, setShowNoteOctaves ] = useState(true);

	

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
					
					scaleData={scaleData} scaleDegreeNotes={scaleDegreeNotes}

					customScaleIntervals={customScaleIntervals} setCustomScaleIntervals={setCustomScaleIntervals}
					isCustomScaleMode={isCustomScaleMode} setIsCustomScaleMode={setIsCustomScaleMode}
					
					showNoteOctaves={showNoteOctaves}
					setShowNoteOctaves={setShowNoteOctaves}
				/>
			</main>
		</>
	)
}