import { getNoteObj } from "../resources/Utils";
import { chromatic_scale } from "../resources/Data";
import Stepper from "./Stepper"
import '../styles/tuner.scss'





export default function Tuner(props) {

	const adjustTuner = (new_value) => {
		const position_idx = (new_value + chromatic_scale.length) % chromatic_scale.length;
		const new_note = getNoteObj(position_idx).name;
		props.setCurrentTuning((prevTuning) => {
			const updated_notes = [...prevTuning.notes];
			updated_notes[props.tunerId] = new_note;
			return {
				...prevTuning,
				notes: updated_notes,
			}
		});
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
		<div className={`tuner tuner--${props.tunerId}`}>
			<Stepper 
				id={`tuner-${props.tunerId}`}
				key={`tuner-${props.tunerId}`} 
				value={ props.numValue }
				displayValue={ props.displayValue }
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
					>x</button>
				)
			}
		</div>
	)
}