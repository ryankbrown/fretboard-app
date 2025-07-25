import { useState } from "react";
import * as Tone from "tone";
import { Note,Scale } from "tonal";
import { interval_to_degree, change_str_case } from "../resources/Utils";
// import "../styles/scale-table.scss";

import PlayPauseIcon from "./PlayPauseIcon";

const ScaleTable = (props) => {

	const bpm = 120;
	Tone.Transport.bpm.value = bpm;
	
	const scale_data = Scale.get(`${props.currentKey} ${props.currentScale}`);
	const scale_degrees_notes = scale_data.notes.map((n, i) => {
		return {
			note: n,
			degree: interval_to_degree(scale_data.intervals[i])
		}
	});

	// Playing
	const [isPlaying, setIsPlaying] = useState(false);


	const playScale = async ()=> {
		await Tone.start();

		const scale_notes = Scale.get(`${props.currentKey}3 ${props.currentScale}`).notes;
		const play_notes =[
			...scale_notes, // Play up the scale
			Note.transpose(scale_notes[0], '8P'), // Finish up with the root octave 
			Note.transpose(scale_notes[0], '8P'), // Start down with the root octave
			...scale_notes.reverse() // Play down the scale
		]
		// const play_notes = ['E3']

		// Create a sequence with the scale notes
		let tone_sequence = new Tone.Sequence((time, note) => {
			props.synth.triggerAttackRelease(note, '4n', time);

			// console.log(`${note} start`);
			props.setHighlightNotes(()=> [note]);

			// Tone.Transport.scheduleOnce(()=> {
			// 	console.log(`${note} end`);
			// 	props.setHighlightNotes(()=> []);
			// }, '+2w')

		}, play_notes, '4n');

		if (!isPlaying) {
			// console.log('playing scale');
			setIsPlaying(true);

			tone_sequence.start();
			Tone.Transport.start();
		} 
		else {
			props.setHighlightNotes(()=> []);
			Tone.Transport.stop();
			Tone.Transport.cancel();
			tone_sequence.stop();
			tone_sequence.dispose();
			tone_sequence = null;

			setIsPlaying(false);
			// console.log('scale stopped')
		}
	}

	const border_styles = `border border-solid border-white/10`;

	const group_heading_styles = 
		`m-0 row-start-1 text-left w-full h-full p-2 border-t border-white/10 [writing-mode:vertical-rl] [text-orientation:mixed] font-semibold or-ch:[writing-mode:unset] or-ch:text-left or-ch:h-full or-ch:w-full or-ch:col-start-1 or-ch:row-start-auto or-ch:whitespace-nowrap`;

	return (
		<div className={`scale-table ${border_styles} w-fit h-fit rounded text-xs [grid-area:scaletable] self-center`}
		>
			<div className="scale-table__header flex flex-col items-center p-3 max-h-50 text-[color:var(--primary-highlight-color)] or-ch:flex-row or-ch:max-h-[unset] or-ch:p-1 or-ch:justify-between">
				<button
					className={`scale-table__btn scale-table__btn--play-scale m-b-1 flex justify-center items-center rounded-full aspect-square w-7 rotate-90 mb-2 h-auto p-2 bg-[var(--primary-highlight-color)] or-ch:w-7 or-ch:p-2 or-ch:mb-0 or-ch:rotate-0 or-ch:order-2 or-ch:mr-1`}
					onClick={ playScale }
				>
					<PlayPauseIcon isPlaying={isPlaying}/>
				</button>
				
				<h2 className="scale-table__title font-bold m-0 block p-1 [writing-mode:vertical-rl] [text-orientation:mixed] text-lg or-ch:[writing-mode:unset]">
					{`
						${props.currentKey.replace('#', '♯').replace('b', '♭')} 
						${change_str_case(props.currentScale, 'upper')}
					`}
				</h2>
			</div>
			<div className={
				`scale-table__body grid grid-cols-[1fr_1fr] grid-flow-row justify-items-center items-center or-ch:grid-cols-[unset]] or-ch:[grid-template-columns:minmax(0,min-content)_repeat(var(--num-cols),minmax(0,1fr))]`
			}
			style={{['--num-cols']: scale_degrees_notes.length}}
			>
				<h3 className={`scale-table__group-heading scale-table__group-heading--degrees ${group_heading_styles} border-r border-white/10`}>Degrees</h3>
				{
					scale_degrees_notes.map((n, i) => (
						<div 
							key={i} 
							style={{['--degree-num']: i}}
							className={
								`scale-table__degree w-full h-full col-start-1 row-start-[calc(var(--degree-num)+2)] border-t border-r border-white/10 or-ch:border-r-0 or-ch:border-l or-ch:row-start-1 or-ch:col-start-[calc(var(--degree-num)+2)]
								${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted bg-[var(--primary-highlight-dark-color)]' : ''}`
							}
						>
							<div className={`scale-table__degree-inner flex justify-center  items-center font-semibold p-2`}
							>	
								{
									n.degree.replace('#', '♯').replace('b', '♭')
								}
							</div>
						</div>
					))
				}
				<h3 className={
					`scale-table__group-heading scale-table__group-heading--notes
					${group_heading_styles}`
				}>Notes</h3>
				{
					scale_degrees_notes.map((n, i) => (
						<div 
							key={i} 
							style={{['--degree-num']: i}}
							className={
								`scale-table__note w-full h-full border-t border-white/10 col-start-2 row-start-[calc(var(--degree-num)+2)] or-ch:row-start-2 or-ch:col-start-[calc(var(--degree-num)+2)] or-ch:border-r-0 or-ch:border-l
								${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted bg-[var(--primary-highlight-dark-color)]' : ''}`
							}
						>
							<div className="scale-table__note-inner flex justify-center items-center font-semibold p-2">	
								{
									Note.simplify(n.note).replace('#', '♯').replace('b', '♭')
								}
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default ScaleTable;
