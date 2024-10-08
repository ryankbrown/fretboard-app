
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
	const scale_names = custom_ordered_scale_names.map((s) => change_str_case(s, 'upper'));

	return (
		<>
			<div className="control-panel">
				
				{/* <h3 className="control-panel__title">{`Options`}</h3> */}
				{/* Scale */}
				<FieldGroup selectorName="scale" legendString="Scale">
					<Dropdown
						id="scale-select"
						options={ scale_names }
						selectedValue={props.currentScale}
						setValue={props.setCurrentScale}
					/>
				</FieldGroup>

				{/* Modify Scale */}
				<FieldGroup
					selectorName="modifyscale"
					legendString="Modify Scale"
				>
					<div style={{ color: "gray" }}>
						Modify Scale Content Here
					</div>
				</FieldGroup>

				{/* Select Key */}
				<FieldGroup
					selectorName="key"
					legendString="Select Key"
					injectedClassesContent="control-panel__key-wrapper grid grid-cols-[repeat(auto-fill, minmax(var(--min-note-size), 1fr))] [grid-area:content]"
				>
					{props.keyList.map((k) => (
						<Toggler
							key={k}
							id={`key-option--${k}`}
							value={k}
							currentValue={ props.currentKey }
							displayValue={ Note.get(k)
								.name.replace("b", "♭")
								.replace("#", "♯") }
							setValue={ props.setCurrentKey }
							injectedClasses="rounded-full !p-[unset]"
							
						/>
					))}
				</FieldGroup>

				{/* Note Type */}
				<FieldGroup
					selectorName="notetype"
					legendString="Note Type"
					isBooleanSwitch={true}
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

				{/* Tuning */}
				<FieldGroup
					selectorName="tuning"
					legendString="Tuning Controls"
					injectedClassesContent="control-panel__modify-tuning-wrapper"
				>
					<TuningControls
						currentTuning={props.currentTuning}
						maxTuners={props.maxTuners}
						setCurrentTuning={props.setCurrentTuning}
					/>
				</FieldGroup>
			</div>
		</>
	);
}
