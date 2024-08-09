import SharpFlatText from './SharpFlatText';
import '../styles/note.scss';

export default function Note(props) {
	return (
		<div className={`note note--${props.note_name.replace('/', '')} note--s${props.string}f${props.fret} ${ props.isRootNote ? 'note--root' : ''} ${ props.inScale ? 'note--in-scale' : ''}
		`}>
			<div className="note__circle"></div>
			<div className="note__name">{
				props.note_obj.sharp || props.note_obj.flat ? ( 
					<SharpFlatText sharp={props.note_obj.sharp} flat={props.note_obj.flat}/> 
				) : (
					props.note_name 
				)
			}</div>
			<div className="note__degree">{props.inScale}</div>
			<div className="note__data">
				<pre style={{ display: 'none'}}>{JSON.stringify(props, null, 2)}</pre>
			</div>
		</div>
	)
}
