
import Note from './Note'
import '../styles/fretboard.scss'
import { getNoteObj } from '../resources/Utils'


export default function Fretboard(props) {
	
	return (
		<>	
			{/* MAIN WRAPPER */}
			<div 
				className={`fretboard fretboard--${props.noteType}`}
				style={{ 
					['--num-strings']: props.currentTuning.notes.length, 
					['--num-frets']: props.numFrets, 
				}} 
			>
				{/* FRETS WRAPPER */}
				<div className="frets-wrapper">{
					[...Array(props.numFrets)].map((_, i) => (
						<div 
							className={`fret fret--${i}`} 
							key={`fret--${i}`}
							style={{ ['--fret-num']: i }}
						></div>
					))
				}</div>

				{/* TUNING NOTES WRAPPER */}
				<div className="tuning-notes-wrapper">{
					props.currentTuning.notes.map( (note_idx, i) => (
						<div 
							className="tuning-note"
							key={`tuning-note--${i}`}
							style={{ ['--string-num']: i }}
						>{ getNoteObj(note_idx).name }</div>
					))
				}</div>

				{/* FRET NUMBERS WRAPPER */}
				<div className="fret-numbers-wrapper">{
					[...Array(props.numFrets)].map((_, i) => (	
						<div 
							className={`fret-number fret-number--${i}`}
							key={`fret-number--${i}`}
							style={{ ['--fret-num']: i }}
						>{i}</div>
					))
				}</div>

				{/* STRINGS WRAPPER */}
				<div className="strings-wrapper">{
					[...Array(props.currentTuning.notes.length)].map((_, i) => (
						<div 
							className={`string string--${i + 1}`} 
							key={`string-num--${i + 1}`}
							style={{ ['--string-num']: i + 1}}
						>
						</div>
					))
				}</div>

				{/* NOTES WRAPPER */}
				<div className="notes-wrapper">{
					props.fretboardData.map((fret_obj, i) => (
						
						<div 
							className={`note__wrapper`}
							key={`note-wrapper--${i}`}
							style={{ 
								['--fret-num']: fret_obj.fret,
								['--string-num']: fret_obj.string
							}}
						>
							<Note key={`note--${i}`} {...fret_obj} />
						</div>
					))
				}</div>
			</div>
		</>
	)
}
