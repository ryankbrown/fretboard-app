export default function SelectGroup(props) {
	// console.log(handleClick);

	const handleDropdownChange = (e) => {
		// console.log('Dropdown', e.target.value);
		props.setSelectedValue(e.target.value);
	}

	return (
		<>
			<select 
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
