export default function InputGroup(props) {
	// console.log(handleClick);

	const handleInputChange = (e) => {
		// console.log('Input Selected', e.target.value);
		props.setSelectedValue(e.target.value);
	}

	return (
		<>
			<div className={`input-group ${props.labelFirst ? "input-group--label-first" : ''}`}>
				{/* Label */}
				<label htmlFor={`input-group__input--${props.id}`} className="input-group__label">{
					props.children ? props.children : props.label
				}</label>
				{/* Input */}
				<input 
					type={props.inputType}
					className={`input-group__input input-group__input--${props.id}`}
					id={`input-group__input--${props.id}`}
					
					onChange={handleInputChange}
					checked={props.selectedValue === props.value}
					value={props.value}
				/>
			</div>
		</>
	)
}
