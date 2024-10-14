import { Scale, Note } from "tonal";

import Toggler from "./Toggler";
import Dropdown from "./Dropdown";
import FieldGroup from "./FieldGroup";
import Stepper from "./Stepper";

import TuningControls from "./TuningControls";

import { change_str_case } from "../resources/Utils";
import { custom_ordered_scale_names } from "../resources/Data";

import "../styles/control-panel.scss";

export default function ControlPanel(props) {
	//uppercased scale names
	const scale_names = custom_ordered_scale_names.map((s) =>
		change_str_case(s, "upper"),
	);

	return (
		<>
			<div
				className={`
					control-panel grid-rows-[repeat(auto-fill,_minmax(0, 1fr))] bottom-0 z-10 col-start-1 col-end-4 row-span-full grid h-full w-full gap-3 overflow-scroll transition-transform duration-300 ease-in-out bg-[var(--primary-dark-bg-color)] or-sm:[grid-area:controlPanel] or-sm:col-start-2 or-ch:[grid-area:controlPanel] or-sm:bg-transparent [grid-template-areas:'key''tuning''scale''numfrets''notetype''scheme''modifyscale'] or-ch:grid-cols-[1.5fr_1.5fr_1fr_1fr] or-ch:[grid-template-areas:'scale_tuning_key_key''modifyscale_numfrets_scheme_notetype']`}
			>
				{/* <h3 className="control-panel__title">{`Options`}</h3> */}
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
					<div style={{ color: "gray" }}>Modify Scale Content Here</div>
				</FieldGroup>

				{/* Select Key */}
				<FieldGroup
					selectorName="key"
					legendString="Select Key"
					injectedClasses="[grid-area:key] grid-rows-[min-content_auto]"
					injectedClassesContent={`control-panel__key-wrapper 
						w-full
						grid 
						items-center
						grid-cols-[repeat(6,minmax(0,1fr))] 
						grid-rows-[auto]
						gap-[var(--control-panel-note-gap)]
						line-height-0
						m-0
						p-0
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
								`rounded-full 
								!p-[unset] 
								aspect-square`
							}
						/>
					))}
				</FieldGroup>

				{/* Tuning */}
				<FieldGroup
					selectorName="tuning"
					legendString="Tuning Controls"
					injectedClasses="[grid-area:tuning]"
					injectedClassesContent="control-panel__modify-tuning-wrapper gap-2"
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
					injectedClassesContent="flex flex-row"
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

				{/* Scheme */}
				<FieldGroup
					selectorName="scheme"
					legendString="Interface Scheme"
					isBooleanSwitch={true}
					injectedClasses="[grid-area:scheme]"
					injectedClassesContent="flex flex-row"
				>
					<Toggler
						value={"scheme-light"}
						currentValue={props.interfaceScheme}
						displayValue="Light Scheme"
						setValue={props.setInterfaceScheme}
						injectedClasses={`rounded-r-none`}
					/>
					<Toggler
						value={"scheme-dark"}
						currentValue={props.interfaceScheme}
						displayValue="Dark Scheme"
						setValue={props.setInterfaceScheme}
						injectedClasses={`rounded-l-none`}
					/>
				</FieldGroup>

				{/* Num Frets */}
				<FieldGroup
					selectorName="num-frets"
					legendString="Number of Frets"
					injectedClasses="[grid-area:numfrets]"
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
			</div>
		</>
	);
}
