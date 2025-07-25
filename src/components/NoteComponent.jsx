import * as Tone from 'tone';

// import SharpFlatText from './SharpFlatText';
import { Note } from 'tonal'

// import '../styles/note.scss';

export default function NoteComponent(props) {

	
	const note_wrapper_styles = 
		`flex justify-center items-center col-[var(--string-num)_/_span_1] row-[calc(var(--fret-num)+2)_/_span_1] or-ch:col-[calc(var(--fret-num)+2)_/_span_1] or-ch:row-[calc(var(--num-strings)-var(--string-num)+1)_/_span_1]`;

	const note_styles = 
		`grid grid-cols-[100%] grid-rows-[100%]	[grid-template-areas:'notecenter'] items-center justify-items-center font-semibold text-white w-full h-full cursor-pointer scale-100 hover:scale-125 active:scale-95 transition-transform`;

	const handleNoteClick = async () => {
		await Tone.start();
		console.log(`Playing ${props.note_obj.name}`);
		props.synth.triggerAttackRelease(props.note_obj.name, "8n", Tone.now());
	}

	const circle_bg_color_styles = props.inScale && props.isRootNote ?
		`bg-[var(--primary-highlight-dark-color)]` :
		`bg-[var(--note-circle-default-color)]`;

	const noteName = (
		<div className="note__name z-2 [grid-area:notecenter] text-center text-sm">{
			props.note_obj.pc.replace('b', '♭').replace('#', '♯')
		}{
			props.showNoteOctaves && (
				<span className="note__oct opacity-70 font-normal">{props.note_obj.oct}</span>
			)
		}</div>
	)

	return (
		<div 
			className={`note__wrapper ${note_wrapper_styles}`}
			style={{ 
				['--fret-num']: props.fret,
				['--string-num']: props.string,
			}}
		>
			<div 
				className={
					`note note--${ Note.get(props.note_obj).name } 
					${note_styles}
					note--s${props.string}f${props.fret} ${ props.isRootNote && 'note--root'} ${ props.inScale && 'note--in-scale' } 
				`} 
				// data-note-pc={props.note_obj.pc}
				// data-note-name={props.note_obj.name}
				// data-note-oct={props.note_obj.oct}
				// data-note-scale-degree={props.degree}
				onClick={ ()=> props.soundState && props.inScale ? handleNoteClick() : null }
				
			>
				{/* Note Circle */}
				<div className={`note__circle [grid-area:notecenter] text-center rounded-full aspect-square ${circle_bg_color_styles} ${ props.highlightNotes.some( e => e.includes(props.note_obj.name) ) && 'ring-[var(--primary-highlight-color)] ring-2'}`}></div>

				{/* Note Content */}
				{
					props.inScale && (
						props.noteType === 'notes' ? noteName : (
							props.isRootNote ? noteName :
								<div className="note__degree z-2 [grid-area:notecenter] text-center text-sm">{ 
									props.degree.replace('b', '♭').replace('#', '♯') 
								}</div>
						)	
					)
				} 
			</div>
		</div>
	)
}
