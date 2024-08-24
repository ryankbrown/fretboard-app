// import SharpFlatText from './SharpFlatText';
import { Note } from 'tonal'
import '../styles/note.scss';

export default function NoteComponent(props) {
	return (
		<div className={`
			note note--${ Note.get(props.note_obj).name } 
			note--s${props.string}f${props.fret} 
			${ props.isRootNote ? 'note--root' : ''} 
			${ props.inScale ? 'note--in-scale' : ''}
		`}>
			<div className="note__circle"></div>
			<div className="note__name">{
				Note.get(props.note_obj).pc
			}</div>
			<div className="note__degree">{props.inScale}</div>
			{/* <div className="note__data">
				<pre style={{ display: 'none'}}>{JSON.stringify(props, null, 2)}</pre>
			</div> */}
		</div>
	)
}
