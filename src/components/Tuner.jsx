import { Note, Interval } from 'tonal'

import Stepper from "./Stepper"
import '../styles/tuner.scss'


export default function Tuner(props) {

	const adjustTuner = (new_value) => {
		let new_note = Note.transpose(
			props.tunerValue, // Current note string
			Interval.fromSemitones(new_value) // Interval change
		)
		// Convert to enharmonic equivalent, or else it renders like so (C####)
		new_note = Note.enharmonic(new_note)
		// document.startViewTransition(()=> {
			props.setCurrentTuning((prevTuning) => {
				const updated_notes = [...prevTuning.notes];
				updated_notes[props.tunerId] = new_note
				return {
					...prevTuning,
					notes: updated_notes,
				}
			});
		// })
	};

	const removeTuner = () => {
		props.setCurrentTuning((prevTuning) => {
			const updated_notes = [...prevTuning.notes];
			updated_notes.splice(props.tunerId, 1);
			return {
				...prevTuning,
				notes: updated_notes,
			}
		});
	}

	return (
		<div className={`tuner tuner--${props.tunerId}`} style={{ viewTransitionName: `tuner${props.tunerId}` }} >
			<Stepper 
				id={`tuner-${props.tunerId}`}
				key={`tuner-${props.tunerId}`} 
				value={ 0 } // setting this to 0 so that we can determine incrementing or decrementing, via -1 or 1.
				displayValue={ Note.get(props.tunerValue).pc.replace('b', '♭').replace('#', '♯') }
				decreaseString="♭"
				increaseString="♯"
				setValue={ adjustTuner }
				disableStepperBtns={props.tunerRemoverState}
			/>
			{
				props.currentTuning.notes.length > 1 && props.tunerRemoverState && (
					<button
						className="tuner__remove-btn"
						onClick={ removeTuner }
						aria-label={`Remove ${props.displayValue} Tuner`}
					><div className="tuner__remove-btn-circle">X</div></button>
				)
			}
		</div>
	)
}