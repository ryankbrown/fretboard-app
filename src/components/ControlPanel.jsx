import Toggler from './Toggler'
import Dropdown from './Dropdown'
import FieldGroup from './FieldGroup'
import Stepper from './Stepper'
import Tuner from './Tuner'
import SharpFlatText from './SharpFlatText'

import '../styles/control-panel.scss'
import { scales, all_notes } from '../resources/Data'





export default function ControlPanel(props) {

	const note_obj_from_name = name => Object.values(all_notes).find(note => note.name === name);

	const reversedStringTuning = props.stringTuning.slice().reverse();

	return ( 
		<>
			<div className="control-panel">
				<div className="control-panel__title">{`Options`}</div>
				{/* Scale */}
				<FieldGroup 
					selectorName="scale" 
					legendString="Scale"
				>
					<Dropdown 
						id="scale-select"
						options={ Object.values(scales).map(s => s.name) }
						selectedValue={props.currentScale}
						setValue={ props.handleScaleSelection }
					/>
				</FieldGroup>

				

				{/* Select Key */}
				<FieldGroup 
					selectorName="key" 
					legendString="Select Key"
				>
					<div className="control-panel__key-wrapper"> {
						props.keyList.map( k => (
								<Toggler 
									key={k} 
									id={`key-option--${k}`} 
									label={k}
									inputType="radio"
									checked={ k === "C" ? true : false }
									value={k}

									selectedValue={props.scaleKey}
									setValue={props.setScaleKey}
								>{
									note_obj_from_name(k).sharp ||
									note_obj_from_name(k).flat ? ( 
										<SharpFlatText 
											sharp={note_obj_from_name(k).sharp} 
											flat={Object.values(all_notes).find(note => note.name === k).flat}
										/> 
									) : (
										props.note_name 
									)
								}</Toggler>
							)
						)
					}
					</div>
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

				<FieldGroup 
					selectorName="num-frets" 
					legendString="Number of Frets"
				>
					<Stepper
						id="num-frets"
						value={props.numFrets}
						decreaseString="-"
						increaseString="+"
						setValue={props.handleSetNumFrets}
					/>
				</FieldGroup>
				
				<FieldGroup 
					selectorName="tuning" 
					legendString="Modify Tuning"
				>
					<div className="control-panel__tuning-wrapper">
						{ props.stringTuning.length < props.maxTuners && (
							<button onClick={()=> props.setTunerRemoveBtns( prevValue => prevValue ? false : true )}>-</button>
						)}
						{
							reversedStringTuning.map( tuner => (
									<Tuner
										key={tuner.tunerId}
										tunerId={tuner.tunerId}
										displayValue={tuner.displayValue}
										numValue={tuner.numValue}

										stringTuning={props.stringTuning}
										onTunerChange={props.handleTunerChange}
										removeTuner={props.removeTuner}
										setStringTuning={props.setStringTuning}
										tunerRemoveBtns={props.tunerRemoveBtns}
									/>
								)
							)
						}
						{ props.stringTuning.length > 1 && (
							<button onClick={props.addTuner}>+</button>
						)}
					</div>
				</FieldGroup>
			</div>
		</>
	)
}




					