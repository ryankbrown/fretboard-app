import '../styles/toggler.scss'

export default function Toggler(props) {

	const handleInputChange = (e) => {
		props.setValue(e.target.value);
	}

	return (
		<>
			<div className={`toggler toggler--${props.id} ${props.labelFirst ? "toggler--label-first" : ''}`}>
				
				{/* Label */}
				<label htmlFor={`toggler__input--${props.id}`} className={`toggler__label toggler__label--${props.id}`}>{
					props.children ? props.children : props.label
				}</label>

				{/* Input */}
				<input 
					type={props.inputType}
					className={`toggler__input toggler__input--${props.id}`}
					id={`toggler__input--${props.id}`}
					
					onChange={handleInputChange}
					checked={props.selectedValue === props.value}
					value={props.value}
				/>
			</div>
		</>
	)
}
