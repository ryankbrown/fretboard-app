import { useState } from "react";
import * as Tone from "tone";
import { Note,Scale } from "tonal";
import { interval_to_degree, change_str_case } from "../resources/Utils";
import "../styles/scale-table.scss";

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


	return (
		<div className="scale-table">
			<div className="scale-table__header">
				<button
					className="scale-table__btn scale-table__btn--play-scale"
					onClick={ playScale }
				>
					<PlayPauseIcon isPlaying={isPlaying}/>
				</button>
				
				<h2 className="scale-table__title">
					{`
						${props.currentKey.replace('#', '♯').replace('b', '♭')} 
						${change_str_case(props.currentScale, 'upper')}
					`}
				</h2>
			</div>
			<div className="scale-table__body">
				<h3 className="scale-table__group-heading scale-table__group-heading--degrees">Degrees</h3>
				{
					scale_degrees_notes.map((n, i) => (
						<div 
							key={i} 
							className={`scale-table__degree ${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted' : ''}`}
							style={{['--degree-num']: i}}
						>
							<div className="scale-table__degree-inner">	
								{
									n.degree.replace('#', '♯').replace('b', '♭')
								}
							</div>
						</div>
					))
				}
				<h3 className="scale-table__group-heading scale-table__group-heading--notes">Notes</h3>
				{
					scale_degrees_notes.map((n, i) => (
						<div 
							key={i} 
							className={`scale-table__note ${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted' : ''}`}
							style={{['--degree-num']: i}}
						>
							<div className="scale-table__note-inner">	
								{
									Note.simplify(n.note).replace('#', '♯').replace('b', '♭')
								}
							</div>
						</div>
					))
				}
			</div>
		</div>



		// <>
		// 	<table className="info-section">
		// 		<thead>
		// 			<tr>
		// 				<th
		// 					className="info-section__title"
		// 					colSpan={scale_data.notes.length + 1}
		// 				>
		// 					{`
		// 						${props.currentKey.replace('#', '♯').replace('b', '♭')} 
		// 						${change_str_case(props.currentScale, 'upper')}
		// 					`}
		// 					<button
		// 						className="info-section__btn info-section__btn--play-scale"
		// 						onClick={ playScale }
		// 					>{
		// 						<PlayPauseIcon isPlaying={isPlaying}/>
		// 					}</button>
		// 				</th>
		// 			</tr>
		// 		</thead>
		// 		<tbody>
		// 			<tr>
		// 				<th className="info-section__header">Scale Degrees</th>
		// 				{
		// 					scale_degrees_notes.map((n, i) => (
		// 						<td 
		// 							key={i} 
		// 							className={`scale-degree ${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted' : ''}`}
		// 							data-scale-degree={n.degree}
		// 						>{
		// 							n.degree.replace('#', '♯').replace('b', '♭')
		// 						}</td>
		// 					))
		// 				}
		// 			</tr>
		// 			<tr>
		// 				<th className="info-section__header">Scale Notes</th>
		// 				{
		// 					scale_degrees_notes.map((n, i) => (
		// 						<td 
		// 							key={i} 
		// 							className={`scale-note ${props.highlightNotes.some( e => e.includes(n.note) ) ? 'note--highlighted' : ''}`}
		// 							data-note-pc={n.note}
		// 						>{
		// 							Note.simplify(n.note).replace('#', '♯').replace('b', '♭')
		// 						}</td>
		// 					))
		// 				}
		// 			</tr>
		// 		</tbody>
		// 	</table>
		// </>
	);
};

export default ScaleTable;
