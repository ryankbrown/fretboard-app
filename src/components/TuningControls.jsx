import { useState } from "react";

import Dropdown from "./Dropdown";
import Tuner from "./Tuner";
import TabPanel from "./TabPanel";

import { tuning_options } from "../resources/Data";



export default function TuningControls(props) {

	const min_tuner_spaces = 6;

	const [tunerRemoverState, setTunerRemoverState] = useState(false);

	const addTuner = () => {
		setTunerRemoverState(false);
		if (props.currentTuning.notes.length < props.maxTuners) {
			// document.startViewTransition(()=> {
			props.setCurrentTuning({
				name: "Custom Tuning",
				notes: [...props.currentTuning.notes, "E2"],
			});
			// })
		}
	};
	
	const addTunerButton = (
		<button
			className="control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--add p-0"
			onClick={addTuner}
			disabled={props.currentTuning.notes.length === props.maxTuners}
		> 
			{/* Add Icon */}
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30">
			<circle cx="15" cy="15" r="13.948" stroke="#3F3F3F" strokeWidth="1.5"/>
			<path stroke="#fff" strokeWidth="1.5" d="M15 7.5v15m7.5-7.5h-15"/></svg>
			<span className="hidden">Add</span>
		</button>
	)

	const removeTunerButton = (
		<button
			className={`control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--remove p-0 ${ tunerRemoverState ? "--active" : "" }`}
			onClick={() => setTunerRemoverState((prevValue) => prevValue ? false : true )
			}
			disabled={props.currentTuning.notes.length === 1}
		>
			{/* Remove Icon */}
			<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13.948" stroke="#3F3F3F" strokeWidth="1.5"/><path stroke="#fff" strokeWidth="1.5" d="M22.5 15h-15"/></svg>
			<span className="hidden">Remove</span>
		</button>
	)
	
	return (
		<TabPanel
			selectorName="tuning"
			injectedContentClasses={
				`control-panel__tuning-wrapper w-full`
			}
			tabData={[
				//* Tuning Select Panel
				{
					title: "Tuning Select",
					selectorName: "tuning-select",
					addedClasses: "control-panel__tuning-select-panel flex justify-item-center items-center",
					content: (
						<Dropdown
							id="tuning-select"
							options={Object.values(tuning_options).map((s) => s.name)}
							selectedValue={props.currentTuning.name}
							setValue={(new_val) => {
								const new_tuning = tuning_options.find( (t) => t.name === new_val);
								props.setCurrentTuning(new_tuning);
								setTunerRemoverState(false);
							}}
						/>
					),
				},

				//* Modify Tuning Panel
				{
					title: "Modify Tuning",
					selectorName: "modify-tuning",
					addedClasses: `control-panel__modify-tuning-wrapper flex flex-row gap-3`,
					content: (
						<>
							{/* Modify Tuner Controls */}
							<div 
								className={
									`control-panel__tuning-controls
									flex
									flex-col
									gap-3
									self-center
									`
								}>
								{addTunerButton}
								{removeTunerButton}
							</div>

							{/* Modify Tuners Wrapper */}
							<div
								className={
									`control-panel__tuning-wrapper grid grid-cols-[repeat(var(--num-tuners),minmax(0,1fr))] gap-1 w-full self-center justify-items-center or-ch:gap-2`
								}
								style={{
									["--num-tuners"]: Math.max(min_tuner_spaces, props.currentTuning.notes.length)
								}}
							> 
								{/* Tuner Components */}
								{props.currentTuning.notes.map(
									(tuner_val, idx) => (
										<Tuner
											key={`tunger--pos-${idx}`}
											tunerId={idx}
											currentTuning={props.currentTuning}
											tunerValue={tuner_val}
											setCurrentTuning={props.setCurrentTuning}
											tunerRemoverState={tunerRemoverState}
											injectedClasses=""
										/>
									)
								)}

								{/* Empty Tuner Divs */}
								{props.currentTuning.notes.length <
									min_tuner_spaces &&
									[...Array(6 - props.currentTuning.notes.length)].map((_, i) => (
										<div
											key={`tuner--empty-${i}`}
											className={
												`tuner 
												w-[var(--min-note-size)]
												h-auto
												rounded-full
												aspect-square
												border
												border-white/20
												self-center
												tuner--empty`
											}
										></div>
									))}
							</div>
						</>
					),
				} // End of Modify Tuning Panel
			]} // End of Tab Data
		/> // End of <TabPanel />
	);
}
