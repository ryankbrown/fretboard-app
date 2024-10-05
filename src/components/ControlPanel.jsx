
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
					contentWrapperClasses="control-panel__key-wrapper"
				>
					{props.keyList.map((k) => (
						<Toggler
							key={k}
							id={`key-option--${k}`}
							label={Note.get(k)
								.name.replace("b", "♭")
								.replace("#", "♯")}
							inputType="radio"
							checked={k === "C" ? true : false}
							value={k}
							selectedValue={props.currentKey}
							setValue={props.setCurrentKey}
						></Toggler>
					))}
				</FieldGroup>

				{/* Note Type */}
				<FieldGroup
					selectorName="notetype"
					legendString="Note Type"
					isBooleanSwitch={true}
				>
					<Toggler
						inputType="radio"
						id="notes"
						label="Show Notes"
						value="notes"
						selectedValue={props.noteType}
						setValue={props.setNoteType}
					/>
					<Toggler
						inputType="radio"
						id="degrees"
						label="Show Degrees"
						value="degrees"
						selectedValue={props.noteType}
						setValue={props.setNoteType}
					/>
				</FieldGroup>

				{/* Scheme */}
				<FieldGroup
					selectorName="scheme"
					legendString="Interface Scheme"
					isBooleanSwitch={true}
				>
					<Toggler
						inputType="radio"
						id="scheme-light"
						label="Light Scheme"
						value="scheme-light"
						selectedValue={props.interfaceScheme}
						setValue={props.setInterfaceScheme}
					/>
					<Toggler
						inputType="radio"
						id="scheme-dark"
						label="Dark Scheme"
						value="scheme-dark"
						selectedValue={props.interfaceScheme}
						setValue={props.setInterfaceScheme}
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
					contentWrapperClasses="control-panel__modify-tuning-wrapper"
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
