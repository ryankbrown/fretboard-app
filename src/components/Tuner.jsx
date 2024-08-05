import { all_notes } from "../resources/Data"
import Stepper from "./Stepper"

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
		<div className={`tuner-stepper tuner-stepper--${props.tunerId}`}>
			<Stepper 
				id={`stepper-tuning--${props.tunerId}`}
				key={`stepper-tuning--${props.tunerId}`} 
				value={props.numValue}
				displayValue={props.displayValue}
				decreaseString="-"
				increaseString="+"
				setValue={ updateTuner }	
			/>
			{
				props.stringTuning.length > 1 && props.tunerRemoveBtns && (
					<button
						onClick={ ()=> props.removeTuner(props.tunerId) }
					>remove</button>
				)
			}
		</div>
	)
}