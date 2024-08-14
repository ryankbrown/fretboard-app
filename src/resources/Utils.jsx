import { all_notes, chromatic_scale, scales, tuning_options } from "./Data";

const getNoteObj = (input) => Object.values(all_notes).find(note => note[ typeof input === 'string' ? 'name' : 'indx' ] === input);

function calcScaleData(targetScaleKey = 'C', targetScale='Ionian') {
	
	// Get the current scale index
	const curr_key_idx = Object.values(all_notes).find( obj_val => obj_val.name === targetScaleKey).indx;
	
	const curr_scale_obj = Object.values(scales).find( scale_obj => scale_obj.name === targetScale)
	
	// Input the first 
	const scale_vals = [];

	let scale_acc = curr_key_idx;
	for (let i = 0; i < curr_scale_obj.steps.length; i++) {

		const note_name = chromatic_scale[scale_acc % chromatic_scale.length];
		const note_obj = getNoteObj(note_name)

		scale_vals.push({
			note: note_name,
			note_obj: note_obj,
			degree: curr_scale_obj.degrees[i],
		});
		scale_acc += curr_scale_obj.steps[i];
	}
	return scale_vals;
}

function calcFretboard(currentTuning, numFrets=13, targetScaleKey='C', scaleData) {
	
	const fretboard_data = [];

	for ( let s = 0; s < currentTuning.notes.length; s++ ) {
		for (let f = 0; f < numFrets; f++) {

			// Get the string tuning note string and index
			const string_tuning_note_idx = getNoteObj(currentTuning.notes[s]).indx ;

			// Get the fret note index
			const fret_indx = (string_tuning_note_idx + f) % (chromatic_scale.length);
			// Get the fret note name
			const note_obj = getNoteObj(chromatic_scale[fret_indx])
			
			const is_note_in_scale = scaleData.some( scale_obj => scale_obj.note === note_obj.name);
			const notes_scale_degree = scaleData.find( scale_obj => scale_obj.note === note_obj.name);
			
			const fret_obj = {
				string: s + 1, // we add 1 because we dont have a String 0
				fret: f,
				note_obj: note_obj,
				note_name: note_obj.name,
				isRootNote: note_obj.name === targetScaleKey,
				inScale: is_note_in_scale ? notes_scale_degree.degree : false
			}
			
			fretboard_data.push(fret_obj)
		}
	}
	// console.table(fretboard_data);
	return fretboard_data;
}

// const calcTuners = (tuner_note_arr, id=0) => {
// 	return tuner_note_arr.map( note => (
// 		{
// 			tunerId: id,
// 			displayValue: note,
// 			numValue: getNoteObj(note).indx
// 		}
// 	))
// }

// const calcTuningData = (currentTuningName, switchtuning) => {

// 	const tuning_notes = Object.values(tuning_options).find(tuning_obj => tuning_obj.name === currentTuningName).notes;

// 	let new_note_vals = tuning_notes.map((note) => getNoteObj(note).indx);
// 	if (switchtuning != undefined) {	
// 		new_note_vals[switchtuning.index] = switchtuning.value;
// 	}
// 	return new_note_vals;
// }


export { calcScaleData, calcFretboard, getNoteObj }