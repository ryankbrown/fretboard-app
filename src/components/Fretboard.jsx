import { Note } from 'tonal'

import NoteComponent from './NoteComponent'

// import '../styles/fretboard.scss'
// import { getNoteObj } from '../resources/Utils'

export default function Fretboard(props) {

	const fretboard_styles = 
		`select-none
		justify-self-center
		self-center
		w-[min(100%,40rem)]
		h-[100%]
		grid
		grid-cols-[repeat(var(--num-strings),1fr)_min-content]
		grid-rows-[min-content_repeat(var(--num-frets),1fr)]
		[grid-area:fretboard]
		justify-center
		items-center
		or-ch:w-[clamp(20rem,100%,400rem)]
		or-ch:h-[clamp(35rem,60%,80rem)]
		or-ch:grid-cols-[5ch_minmax(5rem,min-content)_repeat(calc(var(--num-frets)-1),minmax(0,1fr))]
		or-ch:grid-rows-[repeat(var(--num-strings),minmax(0,1fr))_minmax(5rem,min-content)]
		or-ch-v:aspect-[2/1]
		or-ch-v:h-auto`

	const wrapper_styles = 
		`col-span-full
		row-span-full
		grid
		grid-cols-subgrid
		grid-rows-subgrid
		`

	const string_styles = 
		`w-[.1rem] 
		h-full
		self-center
		justify-self-center	
		bg-gray-500
		[grid-column:calc(var(--num-strings)-var(--string-num)+1)_/_span_1]
		row-start-3
		row-span-full
		or-ch:w-full
		or-ch:h-[.1rem]
		or-ch:col-start-3
		or-ch:col-span-full
		or-ch:row-[var(--note-string)_/_span_1]`

	const fret_styles = 
		`self-end
		[grid-row:calc(var(--fret-num)+2)_/_span_1]
		[grid-column:1_/_-2]
		w-full
		h-[.2rem]
		or-ch:w-[.2rem]
		or-ch:h-full
		or-ch:[grid-column:calc(var(--fret-num)+2)_/_span_1]
		or-ch:[grid-row:1_/_-2]
		or-ch:justify-self-end`

	const fret_number_styles = 
		`row-[calc(var(--fret-num)+2)_/_span_1]
		col-[-1_/_span_1]
		self-center
		justify-self-center
		or-ch:col-[calc(var(--fret-num)+2)_/_span_1]
		or-ch:row-[-2_/_span_1]
		or-ch:pt-[1.5rem]`

	const number_tuning_styles = 
		`mix-blend-hard-light
		text-white/50
		text-sm`
	
	const tuning_note_styles = 
		`[grid-column:calc(var(--string-num)+1)_/_span_1]
		[grid-row:1_/_span_1]
		justify-self-center
		self-center
		or-ch:row-[calc(var(--num-strings)-var(--string-num))_/_span_1]
		or-ch:col-[1_/_span_1]`


	return (
		<>	
			
			<div 
				className={`fretboard fretboard--${props.noteType} ${fretboard_styles}`}
				style={{ 
					['--num-strings']: props.currentTuning.notes.length, 
					['--num-frets']: props.numFrets, 
				}} 
			>

				<div className={`frets-wrapper ${wrapper_styles}`}>{
					[...Array(props.numFrets)].map((_, i) => (
						<div 
							className={
								`fret fret--${i} ${fret_styles} ${(i === 0 || i === 12 || i === 24) ? `bg-[var(--primary-light-text-color)]` : `bg-[var(--fret-wire-color)]`}`
							} 
							key={`fret--${i}`}
							style={{ ['--fret-num']: i }}
						></div>
					))
				}</div>

				
				<div className={`tuning-notes-wrapper ${wrapper_styles}`}>{
					props.currentTuning.notes.map( (tuning_note, i) => (
						<div 
							className={`tuning-note ${number_tuning_styles} ${tuning_note_styles}`}
							key={`tuning-note--${i}`}
							style={{ ['--string-num']: i }}
						>{ Note.get(tuning_note).name.replace('b', '♭').replace('#', '♯') }</div>
					))
				}</div>

				
				<div className={`fret-numbers-wrapper ${wrapper_styles}`}>{
					[...Array(props.numFrets)].map((_, i) => (	
						<div 
							className={`fret-number fret-number--${i} ${fret_number_styles} ${number_tuning_styles}`}
							key={`fret-number--${i}`}
							style={{ ['--fret-num']: i }}
						>{i}</div>
					))
				}</div>

				
				<div className={`strings-wrapper ${wrapper_styles}`}>{
					[...Array(props.currentTuning.notes.length)].map((_, i) => (
						<div 
							className={`string string--${i + 1} ${string_styles}`}
							key={`string-num--${i + 1}`}
							style={{ ['--string-num']: i + 1}}
						>
						</div>
					))
				}</div>

				
				<div className={`notes-wrapper ${wrapper_styles}`}>{
					props.fretboardData.map((fret_obj, i) => (
						fret_obj.inScale && (
							<NoteComponent 
								key={`note--${i}`} 
								{...fret_obj} 
								synth={props.synth}
								soundState={props.soundState}
								noteType={props.noteType}
								highlightNotes={props.highlightNotes}
								setHighlightNotes={props.setHighlightNotes}
							/>
						)
					))
				}</div>
			</div>
		</>
	)
}
