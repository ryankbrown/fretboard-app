// import '../styles/stepper.scss'




export default function Stepper(props) {

	
	return (
		<div className={`stepper stepper--${props.id} grid justify-items-center items-center ${props.injectedClasses || ''}`}>

			<button 
				className={`stepper__btn stepper__btn--decrease [grid-area:decrease] rounded-[unset] rounded-l-[var(--toggler-corner-radius)] h-full ${props.injectedClassesDecrease || ''}`}

				onClick={ ()=> props.setValue( props.value - 1 ) }
				disabled={props.disableStepperBtns}
			>{ props.decreaseString }</button>

			<div 
				className={`stepper__value [grid-area:value] w-full p-1 text-center min-w-[5ch] bg-[var(--primary-highlight-dark-color)] text-bold text-white flex justify-center items-center ${props.injectedClassesValue || ''}`}
			>{
				props.displayValue || props.value
			}</div>

			<button 
				className={`stepper__btn stepper__btn--increase [grid-area:increase] rounded-[unset] rounded-r-[var(--toggler-corner-radius)] h-full ${props.injectedClassesIncrease || ''}`}
				onClick={ ()=> props.setValue( props.value + 1 ) }
				disabled={props.disableStepperBtns}
			>{ props.increaseString }</button>

		</div>
	)
}