import { Note, Scale, Interval } from 'tonal';


function calc_fretboard_data(currentTuning, numFrets=13, currentKey='E', currentScale) {

	console.log('currentKey', currentKey);
	const sharp_flat_type = Note.get(currentKey).acc;
	// console.log('starting tuning notes');
	const tuning_notes = currentTuning.notes.map(note => {
		// console.log(note)
		if (
			(sharp_flat_type === 'b' && note.includes('#')) || 
			(sharp_flat_type === '#' && note.includes('b'))
		) {
		  	return Note.enharmonic(note);
		}
		return note;
	});

	// console.log('adjusted tuning notes', tuning_notes);
	const scale_data = Scale.get(`${currentKey} ${currentScale}`);
	const scale_pitch_classes = scale_data.notes.map(note => Note.pitchClass(note));

	// console.log('scale pitch classes', scale_pitch_classes);
	// console.log('intervals', scale_data.intervals)
	
	// Remember that currentTuning is an object with {name, notes} created by me and note tonal.js
	const fretboard_data = [];

	for ( let s = 0; s < tuning_notes.length; s++ ) {
		for (let f = 0; f < numFrets; f++) {

			const starting_string_note = currentTuning.notes[s];
			// Transpose the note according to the fret number
			const fret_note_name = Note.transpose(starting_string_note, Interval.fromSemitones(f) )

			let note_obj;
			if (
				(sharp_flat_type === 'b' && fret_note_name.includes('#')) || 
				(sharp_flat_type === '#' && fret_note_name.includes('b'))
			) {
				note_obj = Note.get(Note.enharmonic(fret_note_name));
			} else {
				note_obj = Note.get(fret_note_name);
			}

			// Determine if the note is in scale
			const is_note_in_scale = scale_pitch_classes.includes(note_obj.pc);
			// console.log(`string-${s} fret-${f}: ${note_obj.pc}`)
			// console.log({ is_note_in_scale });

            const notes_scale_degree = scale_pitch_classes.indexOf(note_obj.pc);
			

			const is_root = note_obj.pc === Note.get(currentKey).pc
			console.log(is_root);

			const fret_obj = {
				string: s + 1, // we add 1 because we dont have a String 0
				fret: f,
				note_obj,
				inScale: is_note_in_scale ? scale_data.intervals[notes_scale_degree] : false,
				isRootNote: is_root
			}
			fretboard_data.push(fret_obj)
		}
	}
	// console.table(fretboard_data);
	return fretboard_data;
}



const str_to_css_selector = (str) => {
	return str
	  .replace(/\s+/g, '-')  // Replace spaces with hyphens
	  .replace(/#/g, 'sharp')  // Replace '#' with 'sharp'
	  .replace(/'/g, '')  // Remove apostrophes
}


export { str_to_css_selector, calc_fretboard_data }