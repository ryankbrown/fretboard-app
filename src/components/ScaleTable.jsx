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
	const scale_degrees = scale_data.intervals.map((interval) => interval);

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

		// Create a sequence with the scale notes
		let tone_sequence = new Tone.Sequence((time, note) => {
			props.synth.triggerAttackRelease(note, '4n', time);


		}, play_notes, '4n');

		if (!isPlaying) {
			console.log('playing scale');
			setIsPlaying(true);

			tone_sequence.start();
			Tone.Transport.start();
		} 
		else {
			Tone.Transport.stop();
			Tone.Transport.cancel();
			tone_sequence.stop();
			tone_sequence.dispose();
			tone_sequence = null;

			setIsPlaying(false);
			console.log('scale stopped')
		}
	}


	return (
		<>
			<table className="info-section">
				<thead>
					<tr>
						<th
							className="info-section__title"
							colSpan={scale_data.notes.length + 1}
						>
							{`
								${props.currentKey.replace('#', '♯').replace('b', '♭')} 
								${change_str_case(props.currentScale, 'upper')}
							`}
							<button
								className="info-section__btn info-section__btn--play-scale"
								onClick={ playScale }
							>{
								<PlayPauseIcon isPlaying={isPlaying}/>
							}</button>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th className="info-section__header">Scale Degrees</th>
						{
							scale_degrees.map((d, i) => (
								<td key={i} className="scale-degree">{interval_to_degree(d).replace('#', '♯').replace('b', '♭')}</td>
							))
						}
					</tr>
					<tr>
						<th className="info-section__header">Scale Notes</th>
						{
							scale_data.notes.map((n, i) => (
								<td key={i} className="scale-note">{Note.simplify(n).replace('#', '♯').replace('b', '♭')}</td>
							))
						}
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default ScaleTable;
