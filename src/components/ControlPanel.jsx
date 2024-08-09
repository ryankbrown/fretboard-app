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

	let reversedStringTuning = props.stringTuning.slice().reverse();
	

	return ( 
		<>
			<div className="control-panel">
				<h3 className="control-panel__title">{`Options`}</h3>
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

				{/* Modify Scale */}
				<FieldGroup 
					selectorName="modifyscale" 
					legendString="Modify Scale"
				>
					<div style={{ color: 'gray' }}>Modify Scale Content Here</div>
				</FieldGroup>


				{/* Select Key */}
				<FieldGroup 
					selectorName="key" 
					legendString="Select Key"
					contentWrapperClasses="control-panel__key-wrapper"
				>{
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
				}</FieldGroup>

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
					legendString="Modify Tuning"
					contentWrapperClasses="control-panel__modify-tuning-wrapper"
				>
					<div className="control-panel__tuning-controls">
						{
							<button 
								className="control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--add" 
								onClick={props.addTuner}
								disabled={props.stringTuning.length === props.maxTuners}
							>Add</button>
						}
						{ 
							<button
								className="control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--remove" 
								onClick={()=> props.setTunerRemoveBtns( prevValue => prevValue ? false : true )}
								disabled={props.stringTuning.length === 1}
							>Remove</button>
						}
					</div>
					<div className="control-panel__tuning-wrapper">
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
						}{
							reversedStringTuning.length < 6 && [...Array(6 - reversedStringTuning.length)].map((_, i)=> <div className="tuner tuner--empty"></div>)
						}
					</div>
					<div className="control-panel__tuning-select">
						{/* <Dropdown 
							id="tuning-select"
							options={ Object.values(scales).map(s => s.name) }
							selectedValue={props.currentScale}
							setValue={ props.handleScaleSelection }
						/> */}
					</div>
				</FieldGroup>
			</div>
		</>
	)
}




					