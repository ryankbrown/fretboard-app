export default function Stepper(props) {
	return (
		<div className={`
			input-group__stepper 
			input-group__stepper--${props.id}
		`}>
			<button 
				className="input-group__stepper-btn input-group__stepper-btn--decrease"
				onClick={ () => props.setValue( props.value - 1 ) }
			>{props.decreaseString}</button>

			<div className="input-group__stepper-value">{props.displayValue ? props.displayValue : props.value}</div>

			<button 
				className="input-group__stepper-btn input-group__stepper-btn--increase"
				onClick={ () => props.setValue( props.value + 1 ) }
			>{props.increaseString}</button>
		</div>
	)
}