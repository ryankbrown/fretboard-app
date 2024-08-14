import '../styles/stepper.scss'

export default function Stepper(props) {
	return (
		<div className={`stepper stepper--${props.id}`}>
			<button 
				className="stepper__btn stepper__btn--decrease"
				onClick={ ()=> props.setValue( props.value - 1 ) }
				disabled={props.disableStepperBtns}
			>{props.decreaseString}</button>

			<div className="stepper__value">{props.displayValue ? props.displayValue : props.value}</div>

			<button 
				className="stepper__btn stepper__btn--increase"
				onClick={ ()=> props.setValue( props.value + 1 ) }
				disabled={props.disableStepperBtns}
			>{props.increaseString}</button>
		</div>
	)
}