import { Note } from 'tonal'

import NoteComponent from './NoteComponent'

import '../styles/fretboard.scss'
// import { getNoteObj } from '../resources/Utils'


export default function Fretboard(props) {
	
	return (
		<>	
			
			<div 
				className={`fretboard fretboard--${props.noteType}`}
				style={{ 
					['--num-strings']: props.currentTuning.notes.length, 
					['--num-frets']: props.numFrets, 
				}} 
			>
				
				<div className="frets-wrapper">{
					[...Array(props.numFrets)].map((_, i) => (
						<div 
							className={`fret fret--${i}`} 
							key={`fret--${i}`}
							style={{ ['--fret-num']: i }}
						></div>
					))
				}</div>

				
				<div className="tuning-notes-wrapper">{
					props.currentTuning.notes.map( (tuning_note, i) => (
						<div 
							className="tuning-note"
							key={`tuning-note--${i}`}
							style={{ ['--string-num']: i }}
						>{ Note.get(tuning_note).name.replace('b', '♭').replace('#', '♯') }</div>
					))
				}</div>

				
				<div className="fret-numbers-wrapper">{
					[...Array(props.numFrets)].map((_, i) => (	
						<div 
							className={`fret-number fret-number--${i}`}
							key={`fret-number--${i}`}
							style={{ ['--fret-num']: i }}
						>{i}</div>
					))
				}</div>

				
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

				
				<div className="notes-wrapper">{
					props.fretboardData.map((fret_obj, i) => (
						
						<div 
							className={`note__wrapper`}
							key={`note-wrapper--${i}`}
							style={{ 
								['--fret-num']: fret_obj.fret,
								['--string-num']: fret_obj.string,
								// ['--note-wrapper-num']: fret_obj.note_obj.indx,
							}}
						>	
							<NoteComponent key={`note--${i}`} {...fret_obj} />
							<div 
								className="note--debug" 
								style={{
									fontWeight: 'bold',
									justifySelf: 'center',
									fontSize: '1.2rem',
									color: 'red',
								}}>
									{fret_obj.inScale}
							</div>
						</div>
					))
				}</div>
			</div>
		</>
	)
}
