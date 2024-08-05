import { useState, useMemo } from 'react'
import Fretboard from './components/Fretboard'
import ControlPanel from './components/ControlPanel.jsx'
import { tuning, chromatic_scale, scales, all_notes } from './resources/Data.jsx'
import "./styles/App.scss" 
import { calcScaleData, calcFretboard } from './resources/Utils.jsx'

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

	console.clear();
	// - - - DEFAULT SETTINGS - - - - 

	// * * *  TUNING * * * 
	const max_tuners = 8;
	const initialTuning = tuning.map((note, i) => {
		return	{
			tunerId: i,
			displayValue: note,
			numValue: Object.values(all_notes).find((n) => n.name === note).indx
		}
	})

	// Ids for tuner
	const [highestTunerId, setHighestTunerId] = useState(initialTuning.length - 1);

	// Array containg all Tuner components
	const [stringTuning, setTunersUpdate] = useState(initialTuning);
	const handleTunerChange = (id, newTuning) => {
		setTunersUpdate( prevAllTunersState => {
			// Loop through the state of all previous tuners
			// find the target tuner via id and inject the new tuning values
			return prevAllTunersState.map( tuner => (tuner.tunerId === id ? { ...tuner, ...newTuning } : tuner));
		});
	};

	const addTuner = () => {		
		if (allTuners.length < max_tuners) {
			setTunersUpdate(prevAllTunersState => {
				const newId = highestTunerId + 1;
	            setHighestTunerId(newId);

				return [
					...prevAllTunersState,
					{
						tunerId: newId,
						displayValue: 'C',
						numValue: Object.values(all_notes).find((n) => n.name === 'C').indx
					}
				]
			})
		}
	}

	const removeTuner = (tunerId) => {
		setTunersUpdate(prevAllTunersState => {
			handleTunerRemoveBtns();
			return prevAllTunersState.filter(tuner => tuner.tunerId !== tunerId);
		});
	}
	const [tunerRemoveBtns, setTunerRemoveBtns] = useState(false)
	const handleTunerRemoveBtns = ()=> {
		setTunerRemoveBtns( prevValue => prevValue ? false : true )
	}




	// * * * NUMBER FRETS * * *  
	const [numFrets, setNumFrets] = useState(13);
	const handleSetNumFrets = (newNumFrets) => {
		setNumFrets(prevNumFrets => (newNumFrets < 5 || newNumFrets > 25) ? prevNumFrets : newNumFrets);
	};

	// * * * SCALE KEY - set to first key in all_notes
	const [scaleKey, setScaleKey] = useState( chromatic_scale[0] );

	// * * * CURRENT SCALE - set to first scale in scale data
	const [currentScale, setCurrentScale] = useState(Object.values(scales)[0].name);
	const handleScaleSelection = (val) => setCurrentScale( val );

	// * * * NOTE TYPE * * *  
	const [noteType, setNoteType] = useState("degrees");

	// * * * INTERFACE * * *  
	const [interfaceScheme, setInterfaceScheme] = useState("scheme-dark");
	// useEffect(() => {
	// 	document.documentElement.style.setProperty('--app-background-color', bgColor);
	// }, [interfaceScheme]);




	// * * *  CALCULATED DATA  * * *  
	const scaleData = useMemo(()=> calcScaleData(scaleKey, currentScale), [scaleKey, currentScale, numFrets, stringTuning])

	const fretboardData = useMemo(()=> calcFretboard(stringTuning, numFrets, scaleKey, scaleData), [scaleKey, currentScale, numFrets, stringTuning])




	//  * * *  Get Key List * * *  
	const key_list = Object.values(all_notes).map( note_obj => note_obj.name);
	
	const app_style_attr = Object.entries(scales).reduce( (acc, [k, v] ) => {
		acc[`--${k}`] = v.color;
		return acc;
	}, {})

	app_style_attr["--primary-highlight-color"] =  `var(--${Object.values(scales).find(scale_obj => scale_obj.name === currentScale).id})`


	console.log('Render App')
	return (
		<>
			<main 
				className={`
					app-main-container
					${interfaceScheme}
					${`current-scale--${Object.values(scales).find(scale_obj => scale_obj.name === currentScale).id}`}
				`}
				style={app_style_attr}
			>
				<h1 className="app-title">Fret<span className="app-title__white">Getter</span></h1>
				<figure className="info-section">
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
				</figure>
				
				<Fretboard
					stringTuning={stringTuning}
					numFrets={numFrets} 
					
					scaleKey={scaleKey}
					currentScale={currentScale} 
					noteType={noteType}
					interfaceScheme={interfaceScheme}

					fretboardData={fretboardData}
				/>
				<ControlPanel 
					
					keyList={key_list}
					numFrets={numFrets} handleSetNumFrets={handleSetNumFrets}
					scaleKey={scaleKey} setScaleKey={setScaleKey}
					noteType={noteType} setNoteType={setNoteType}

					stringTuning={stringTuning}
					handleTunerChange={handleTunerChange}
					
					tunerRemoveBtns={tunerRemoveBtns}
					setTunerRemoveBtns={setTunerRemoveBtns}
					removeTuner={removeTuner}
					maxTuner={max_tuners}

					interfaceScheme={interfaceScheme} setInterfaceScheme={setInterfaceScheme}
					currentScale={currentScale} handleScaleSelection={handleScaleSelection}
				
				/>
			</main>
		</>
	)
}