import '../styles/dropdown.scss'

export default function Dropdown(props) {
	return (
		<>
			<select
				className={`dropdown dropdown--${props.id}`} 
				id={props.id} 
				name={props.id} 
				onChange={ (e) => props.setValue(e.target.value) }
				value={props.selectedValue}
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
