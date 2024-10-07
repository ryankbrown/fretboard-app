

// import '../styles/toggler.scss'

export default function Toggler(props) {

	const buttonStyles = `flex justify-center items-center text-center font-semibold px-4 py-2 text-[var(--primary-light-text-color)] text-sm`;

	const toggleStyles = props.value === props.currentValue ? 'bg-[--primary-highlight-dark-color]' : 'bg-[var(--disabled-input-color)]'

	return (
		<>
			<button
				className={ `${buttonStyles} ${toggleStyles} ${ props.injectedClasses || '' }` }
				onClick={ ()=> props.setValue(props.value) }
			>
				{ props.children ? props.children : props.displayValue }
			</button>
		</>
	)
}
