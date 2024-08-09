import { all_notes } from "../resources/Data"
import Stepper from "./Stepper"
import '../styles/tuner.scss'

export default function Tuner(props) {

	const updateTuner = (newVal) => {
		const numValue = (newVal + 12) % 12;
		const newTuning = {
			displayValue: Object.values(all_notes).find((note) => note.indx === numValue).name,
			numValue
		};
		props.onTunerChange(props.tunerId, newTuning);
	};

	return (
		<div className={`tuner tuner--${props.tunerId}`}>
			<Stepper 
				id={`tuner-${props.tunerId}`}
				key={`tuner-${props.tunerId}`} 
				value={ props.numValue }
				displayValue={ props.displayValue }
				decreaseString="♭"
				increaseString="♯"
				setValue={ updateTuner }	
			/>
			{
				props.allTuners.length > 1 && props.tunerRemoveBtns && (
					<button
						className="tuner__remove-btn"
						onClick={ ()=> props.removeTuner(props.tunerId) }
					>x</button>
				)
			}
		</div>
	)
}