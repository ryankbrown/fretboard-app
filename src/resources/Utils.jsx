import { all_notes, chromatic_scale, scales } from "./Data";
function calcScaleData(targetScaleKey = 'C', targetScale='Ionian') {
	
	// Get the current scale index
	const curr_key_idx = Object.values(all_notes).find( obj_val => obj_val.name === targetScaleKey).indx;
	
	const curr_scale_obj = Object.values(scales).find( scale_obj => scale_obj.name === targetScale)

	// const curr_scale_obj = scales[targetScale];
	
	// Input the first 
	const scale_vals = [];

	let scale_acc = curr_key_idx;
	for (let i = 0; i < curr_scale_obj.steps.length; i++) {

		const note_name = chromatic_scale[scale_acc % chromatic_scale.length];
		const note_obj = Object.values(all_notes).find( note_obj => note_obj.name === note_name);

		scale_vals.push({
			note: note_name,
			note_obj: note_obj,
			degree: curr_scale_obj.degrees[i],
		});
		scale_acc += curr_scale_obj.steps[i];
	}
	return scale_vals;
}

function calcFretboard(stringTuning, numFrets=13, targetScaleKey='C', scaleData) {
	const fretboard_data = [];

	const numStrings = stringTuning.length;
	for ( let s = 0; s < numStrings; s++ ) {
		for (let f = 0; f < numFrets; f++) {

			// Get the string tuning note string and index
			const string_tuning_note = stringTuning[s];
			// console.log(string_tuning_note)

			// const tuning_note_chromatic_indx = chromatic_scale.indexOf(string_tuning_note);
			const tuning_note_chromatic_indx = string_tuning_note.numValue;

			// Get the fret note index
			const fret_indx = (tuning_note_chromatic_indx + f) % (chromatic_scale.length);

			
			// Get the fret note name
			const note_obj = Object.values(all_notes).find( note_obj => note_obj.name === chromatic_scale[fret_indx]
			);
			
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

export { calcScaleData, calcFretboard }