// import '../styles/stepper.scss'




export default function Stepper(props) {

	const btn_styles = "rounded-[unset] w-full h-full p-2 text-white flex justify-center items-center text-bold text-lg"
	
	return (
		<div className={`stepper stepper--${props.id} grid justify-items-center items-center [grid-template-areas:'decrease_value_increase'] grid-cols-[1fr_min-content_1fr] grid-rows-[min-content] ${props.injectedClasses || ''}`}>

			<button 
				className={`stepper__btn stepper__btn--decrease [grid-area:decrease] cursor-pointer ${btn_styles} ${props.injectedClassesDecrease || ''}`}
				onClick={ ()=> props.setValue( props.value - 1 ) }
				disabled={props.disableStepperBtns}
			>{ props.decreaseString }</button>

			<div 
				className={`stepper__value [grid-area:value] ${btn_styles} bg-[var(--primary-highlight-dark-color)] font-bold ${props.injectedClassesValue || ''}`}
			>{
				props.displayValue || props.value
			}</div>

			<button 
				className={`stepper__btn stepper__btn--increase [grid-area:increase] cursor-pointer ${btn_styles} ${props.injectedClassesIncrease || ''}`}
				onClick={ ()=> props.setValue( props.value + 1 ) }
				disabled={props.disableStepperBtns}
			>{ props.increaseString }</button>

		</div>
	)
}