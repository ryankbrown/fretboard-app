import { Note, Scale, Interval } from 'tonal';



// Removes pitchClass and simplifies
const get_core_note = str => Note.simplify( Note.pitchClass(str) )


// Written by Claude AI
const interval_to_degree = (interval) => {
	const degreeMap = {
	  '1P': '1', '2M': '2', '3M': '3', '4P': '4', '5P': '5', '6M': '6', '7M': '7',
	  '2m': 'b2', '3m': 'b3', '4A': '#4', '5A': '#5', '6m': 'b6', '7m': 'b7',
	  '2A': '#2', '3A': '#3', '5d': 'b5', '7d': 'bb7',
	  '1A': '#1', '4d': 'b4', '6A': '#6', '7A': '#7',
	  '2d': 'bb2', '3d': 'bb3', '6d': 'bb6'
	};
  
	if (degreeMap[interval]) {
	  return degreeMap[interval];
	}
  
	// Fallback for unmapped intervals
	const quality = interval.slice(-1);
	const number = interval.slice(0, -1);
	
	switch (quality) {
		case 'd': return `b${number}`;
		case 'm': return `b${number}`;
		case 'M': return number;
		case 'A': return `#${number}`;
		default: return interval;  // If we can't parse it, return the original
	}
};






const note_acc_to_scale = (note_name, scale_name, current_key) => {
	// Get the note object and the enharmonic note object
	const note_obj = Note.get(Note.simplify(note_name));
	const enh_note_obj = Note.get(Note.simplify(Note.enharmonic(note_name)))

	// Get the scale object and the scale pitch classes
	const scale_obj = Scale.get(scale_name);
	const scale_pitch_classes = scale_obj.notes.map(n => Note.pitchClass(n))
	
	// If the note or scale object is invalid throw an error
	if ( !note_obj || !scale_obj ) {
	  throw new Error("Invalid note or scale name");
	}

	// Detect whether the scale has sharps or flats
	let scaleAcc;
	if ( scale_obj.notes.some(n => n.includes('#')) ) {
		scaleAcc = '#';
	} else if ( scale_obj.notes.some(n => n.includes('b')) )
		scaleAcc = 'b';
	else {
		scaleAcc = '';
	}
	
	// Convert the note to the scale's same accidental type
	// let converted_note;  
	// if (note_obj.acc) {
	// 	converted_note = [ note_obj, enh_note_obj ].find(i => i.acc === scaleAcc ) || note_obj
	// 	console.log(converted_note)
	// }
	// else {
	// 	converted_note = note_obj
	// }

	const converted_note = [ note_obj, enh_note_obj ].find(i => i.acc === scaleAcc ) || note_obj;
	
	// Find the converted note in the scale's pitch classes
	const matching_scale_note = scale_pitch_classes.findIndex(n => n === converted_note.pc);

	// If the note is in the scale then get the interval of the matching scale note. If it is not in the scale then return false
	const inScale = scale_obj.intervals[matching_scale_note] ?? false;

	// Determine if the note is the root note of the scale
	const isRootNote = converted_note.pc === Note.get(current_key).pc;

	return { 
		note_obj: converted_note, 
		noteName : converted_note.name,
		inScale, 
		scaleAcc, 
		isRootNote 
	}
}


const calc_fretboard_data = (currentTuning, numFrets=13, currentKey='E', currentScale) => {

	const curr_key_scale = `${currentKey} ${currentScale}`;
	
	const fretboard_data = [];

	// Remember that currentTuning is an object with {name, notes} created by me and note tonal.js
	for ( let s = 0; s < currentTuning.notes.length; s++ ) {
		for (let f = 0; f < numFrets; f++) {

			// Get the starting string note
			const starting_string_note = currentTuning.notes[s];
			// Transpose the string note according to the fret number
			const fret_note_name = Note.transpose(starting_string_note, Interval.fromSemitones(f) )

			// Parse the note to get the note object, note name, if it is in the scale, the scale's accidental type, and if it is the root note
			const parsed_note = note_acc_to_scale(fret_note_name, curr_key_scale, currentKey);
			fretboard_data.push({
				...parsed_note,
				string: s + 1,
				fret: f,
			})
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


export { str_to_css_selector, calc_fretboard_data, interval_to_degree, get_core_note }