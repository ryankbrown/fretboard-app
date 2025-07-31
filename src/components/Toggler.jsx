// Toggler.jsx

// import '../styles/toggler.scss'

export default function Toggler(props) {

	const buttonStyles = `flex justify-center items-center text-center font-semibold px-4 py-2 text-[var(--primary-light-text-color)] text-sm cursor-pointer duration-500 transition-all hover:scale-105`;

	const toggleStyles = props.value === props.currentValue ? 'bg-(--primary-highlight-dark-color) hover:bg-(--primary-highlight-color)' : 'bg-(--disabled-input-color) hover:bg-white/20 '

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
