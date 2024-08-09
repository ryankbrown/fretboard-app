
import Note from './Note'
import '../styles/fretboard.scss'


export default function Fretboard(props) {
	
	return (
		<>	
			<div 
				className={`fretboard fretboard--${props.noteType}`}
				style={{ 
					['--num-strings']: props.allTuners.length, 
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
					props.allTuners.map( (str, i) => (
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
					[...Array(props.allTuners.length)].map((_, i) => (
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
