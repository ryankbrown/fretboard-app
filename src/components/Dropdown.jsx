import '../styles/dropdown.scss'

export default function Dropdown(props) {
	return (
		<>
			<div className="dropdown__wrapper">
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
						>{s}
						</option>
					))
				}
				</select>
				<svg className="dropdown__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="9" fill="none" viewBox="0 0 14 9"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1.17 1.974 7 7.026l5.83-5.052"/></svg>
			</div>
		</>
	)
}
