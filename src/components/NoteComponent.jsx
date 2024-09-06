import * as Tone from 'tone';

// import SharpFlatText from './SharpFlatText';
import { Note } from 'tonal'
import '../styles/note.scss';

export default function NoteComponent(props) {

	const handleNoteClick = async () => {
		await Tone.start();
		console.log(`Playing ${props.note_obj.name}`);
		props.synth.triggerAttackRelease(props.note_obj.name, "8n", Tone.now());
	}

	return (
		<div className={`
			note note--${ Note.get(props.note_obj).name } 
			note--s${props.string}f${props.fret} 
			${ props.isRootNote ? 'note--root' : ''} 
			${ props.inScale ? 'note--in-scale' : ''}
		`} 
			onClick={ ()=> props.soundState && props.inScale ? handleNoteClick() : null }
		>
			<div className="note__circle"></div>
			<div className="note__name">{
				props.note_obj.pc.replace('b', '♭').replace('#', '♯')
			}</div>
			<div className="note__degree">{ props.degree }</div>
		</div>
	)
}
