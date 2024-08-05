import SharpFlatText from './SharpFlatText';
import '../styles/Fretboard.scss'

function Note(props) {
	
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

export default function Fretboard(props) {

	return (
		<>	
			<div 
				className={`fretboard fretboard--${props.noteType}`}
				style={{ 
					['--num-strings']: props.stringTuning.length, 
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
					props.stringTuning.map( (str, i) => (
						<div 
							className="tuning-note"
							key={`tuning-note--${i}`}
							style={{ ['--string-num']: i }}
						>{str.displayValue}</div>
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
					[...Array(props.stringTuning.length)].map((_, i) => (
						<div 
							className={`string string--${i}`} 
							key={`string-num--${i}`}
							style={{ ['--string-num']: i }}
						>
						</div>
					))
				}</div>

				<div className="notes-wrapper">{
					props.fretboardData.map((fret_obj, i) => (
						
						<div 
							className={`note__wrapper`}
							// note__wrapper--${fret_obj.fret} 
							// note__wrapper-string--${fret_obj.string}
							// note__wrapper--s${fret_obj.string}f${i}
							key={`note-wrapper--${i}`}
							style={{ 
								['--note-fret']: fret_obj.fret,
								['--note-string']: fret_obj.string
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
