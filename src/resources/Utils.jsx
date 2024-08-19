import { Note, Scale, Interval } from 'tonal';

function calc_fretboard_data(currentTuning, numFrets=13, currentKey='E', currentScale) {

	const scale_data = Scale.get(`${currentKey} ${currentScale}`);

	// Remember that currentTuning is an object with {name, notes} created by me and note tonal.js
	const fretboard_data = [];

	for ( let s = 0; s < currentTuning.notes.length; s++ ) {
		for (let f = 0; f < numFrets; f++) {

			const starting_string_note = currentTuning.notes[s];

			// Get the note
			const string_obj = Note.get(starting_string_note)
			// Transpose the note according to the fret number
			const fret_note_name = Note.transpose(string_obj, Interval.fromSemitones(f) )
			const note_obj = Note.get(fret_note_name);

			// Determine if the note is in scale
			const is_note_in_scale = scale_data.notes.includes( note_obj.pc );			
			const notes_scale_degree = scale_data.notes.indexOf(note_obj.pc);


			const fret_obj = {
				string: s + 1, // we add 1 because we dont have a String 0
				fret: f,
				note_obj,

				// FIX THIS
				isRootNote: note_obj.letter === Note.get(currentKey).letter,
				inScale: is_note_in_scale ? scale_data.intervals[notes_scale_degree] : false

			}
			fretboard_data.push(fret_obj)
		}
	}
	// console.table(fretboard_data);
	return fretboard_data;
}


const calc_chromatic_scale = (current) => {
	
}


const str_to_css_selector = (str) => {
	return str
	  .replace(/\s+/g, '-')  // Replace spaces with hyphens
	  .replace(/#/g, 'sharp')  // Replace '#' with 'sharp'
	  .replace(/'/g, '')  // Remove apostrophes
}


export { str_to_css_selector, calc_fretboard_data }