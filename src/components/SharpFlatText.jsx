import '../styles/sharp-flat-text.scss'
export default function SharpFlatText(props) {
	return (
		<div className="sharp-flat__wrapper">
			<div className="sharp-flat__sharp">
				{`${props.sharp}♯`}
			</div>
			<div className="sharp-flat__line"></div>
			<div className="sharp-flat__flat">
				{`${props.flat}♭`}
			</div>
		</div>
	)
}