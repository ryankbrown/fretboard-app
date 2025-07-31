// ControlPanel.jsx

import { Note, Scale } from "tonal";

import Toggler from "./Toggler";
import ScaleToggler from "./ScaleToggler";
import Dropdown from "./Dropdown";
import FieldGroup from "./FieldGroup";
import Stepper from "./Stepper";

import TuningControls from "./TuningControls";

import { interval_to_degree, change_str_case } from "../resources/Utils";
import { custom_ordered_scale_names, piano_keys } from "../resources/Data";


export default function ControlPanel(props) {

	//uppercased scale names
	const scale_names = custom_ordered_scale_names.map((s) =>
		change_str_case(s, "upper"),
	);







	return (
		<>
			<div
				className="control-panel grid-rows-[repeat(auto-fill,_minmax(0, 1fr))] bottom-0 z-10 col-start-1 col-end-4 row-span-full grid h-full w-full gap-3 overflow-scroll transition-transform duration-300 ease-in-out bg-[var(--primary-dark-bg-color)] [grid-template-areas:'key''tuning''scale''numfrets''notetype''scheme''modifyscale']  or-sm:[grid-area:controlPanel] or-sm:col-start-2 or-ch:[grid-area:controlPanel] or-sm:bg-transparent  or-ch:grid-cols-[1fr_1fr_1fr] or-ch:[grid-template-areas:'scale_tuning_key_key''modifyscale_scheme_numfrets_notetype']"
			>
				{/* Scale */}
				<FieldGroup
					selectorName="scale"
					legendString="Scale"
					injectedClasses="[grid-area:scale]"
				>
					<Dropdown
						id="scale-select"
						options={scale_names}
						selectedValue={props.currentScale}
						setValue={props.setCurrentScale}
					/>
				</FieldGroup>

				{/* Modify Scale */}
				<FieldGroup
					selectorName="modifyscale"
					legendString="Modify Scale"
					injectedClasses="[grid-area:modifyscale]"
				>
					<div 
						className="modify-scale__wrapper grid gap-x-1.5 grid-cols-14 grid-rows-2 size-full"
					>{
						piano_keys.map((key, idx) => (

							<ScaleToggler
								key={`scale-toggler--${idx}`}
								id={`modify-scale-option--${key.interval}`}
								noteQuality={key.type}

								customScaleIntervals={props.customScaleIntervals}
								setCustomScaleIntervals={props.setCustomScaleIntervals}

								isCustomScaleMode={props.isCustomScaleMode}
								setIsCustomScaleMode={props.setIsCustomScaleMode}

								currentScale={props.currentScale}
								setCurrentScale={props.setCurrentScale}

								value={key.interval}
								colStart={key.col_start}
							/>
						))
					}</div>
				</FieldGroup>

				{/* Select Key */}
				<FieldGroup
					selectorName="key"
					legendString="Select Key"
					injectedClasses="[grid-area:key] grid-rows-[min-content_auto]"
					injectedContentClasses={`control-panel__key-wrapper w-full flex flex-wrap gap-2
					`}
				>
					{props.keyList.map((k) => (
						<Toggler
							key={k}
							id={`key-option--${k}`}
							value={k}
							currentValue={props.currentKey}
							displayValue={Note.get(k)
								.name.replace("b", "♭")
								.replace("#", "♯")}
							setValue={props.setCurrentKey}
							injectedClasses={
								`rounded-full w-[var(--circle-ctrl-size)] h-[var(--circle-ctrl-size)]`
							}
						/>
					))}
				</FieldGroup>

				{/* Tuning */}
				<FieldGroup
					selectorName="tuning"
					legendString="Tuning Controls"
					injectedClasses="[grid-area:tuning]"
					injectedContentClasses="control-panel__modify-tuning-wrapper gap-2 grid"
				>
					<TuningControls
						currentTuning={props.currentTuning}
						maxTuners={props.maxTuners}
						setCurrentTuning={props.setCurrentTuning}
					/>
				</FieldGroup>

				{/* Note Type */}
				<FieldGroup
					selectorName="notetype"
					legendString="Note Type"
					isBooleanSwitch={true}
					injectedClasses="[grid-area:notetype]"
					injectedContentClasses="flex flex-row"
				>
					<Toggler
						value={"notes"}
						currentValue={props.noteType}
						displayValue="Show Notes"
						setValue={props.setNoteType}
						injectedClasses={`rounded-r-none`}
					/>
					<Toggler
						value={"degrees"}
						currentValue={props.noteType}
						displayValue="Show Degrees"
						setValue={props.setNoteType}
						injectedClasses={`rounded-l-none`}
					/>
				</FieldGroup>


				{/* Num Frets */}
				<FieldGroup
					selectorName="num-frets"
					legendString="Number of Frets"
					injectedClasses="[grid-area:numfrets] or-sm:[grid-template-areas:'legend_content'] or-sm:grid-cols-[1fr_1fr] or-sm:grid-rows-[1fr]"
					injectedLegendClasses="[grid-area:legend] col-start-1 col-span-1 row-start-1 row-span-1"
					injectedContentClasses="[grid-area:content] m-0 p-0 row-start-1 row-span-1"
				>
					<Stepper
						id="num-frets"
						value={props.numFrets}
						displayValue={props.numFrets - 1}
						decreaseString="-"
						increaseString="+"
						setValue={props.handleSetNumFrets}
					/>
				</FieldGroup>
				{/* <FieldGroup
					selectorName="show-note-octaves"
					legendString="Show Note Octaves"

				>
					<Toggler	
						id="show-note-octaves"
						value="show-note-octaves"
						currentValue={props.showNoteOctaves}
						displayValue="Show Note Octaves"
						setValue={props.setShowNoteOctaves}
					/>
				</FieldGroup> */}
			</div>
		</>
	);
}
