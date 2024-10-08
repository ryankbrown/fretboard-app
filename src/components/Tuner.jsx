import { Note, Interval } from 'tonal'

import Stepper from "./Stepper"
import '../styles/tuner.scss'


export default function Tuner(props) {

	// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
	// 	<path stroke="#fff" stroke-width="1.441" d="m4.726 4.448 7 7m0-7-7 7"/>
	// </svg>


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
		<div 
			className={`tuner tuner--${props.tunerId} relative origin-center`} 
			style={{ viewTransitionName: `tuner${props.tunerId}` }} 
		>
			<Stepper 
				id={`tuner-${props.tunerId}`}
				key={`tuner-${props.tunerId}`} 
				value={ 0 } // setting this to 0 so that we can determine incrementing or decrementing, via -1 or 1.
				displayValue={ Note.get(props.tunerValue).pc.replace('b', '♭').replace('#', '♯') }
				decreaseString="♭"
				increaseString="♯"
				setValue={ adjustTuner }
				disableStepperBtns={props.tunerRemoverState} 
				injectedClasses={`[grid-template-areas:'decrease''value''increase']`}
			/>
			{
				props.currentTuning.notes.length > 1 && props.tunerRemoverState && (
					<button
						className="tuner__remove-btn bg-transparent col-span-full row-span-full absolute w-full h-full top-0 left-0 text-center transform-origin-center"
						onClick={ removeTuner }
						aria-label={`Remove ${props.displayValue} Tuner`}
					>
						<div
						 	className="tuner__remove-btn-circle bg-[var(--primary-highlight-dark-color)] rounded-full right-0 top-0 p-0 flex items-center justify-center"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
								<path stroke="#fff" strokeWidth="1.5" d="m4.726 4.448 7 7m0-7-7 7"/>
							</svg>
						</div>
					</button>
				)
			}
		</div>
	)
}