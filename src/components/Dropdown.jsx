import '../styles/dropdown.scss'

export default function Dropdown(props) {
	// console.log(handleClick);

	const handleDropdownChange = (e) => {
		// console.log('Dropdown', e.target.value);
		props.setValue(e.target.value);
	}

	return (
		<>
			<select
				className={`dropdown dropdown--${props.id}`} 
				value={props.currentScale}
				id={props.id} 
				name={props.id} 
				onChange={handleDropdownChange}
			>{
				props.options.map( (s, i) => (
					<option 
						key={i}
						value={s}
					>{ s }
					</option>
				))
			}</select>
		</>
	)
}
