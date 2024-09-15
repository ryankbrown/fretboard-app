import { Note, Scale, Interval } from 'tonal';
import { color_data, custom_ordered_scale_names } from './Data';


const shuffle_array = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Removes pitchClass and simplifies
const get_core_note = str => Note.simplify( Note.pitchClass(str) )


// Written by Claude AI
// Interval Quality Notation
// Scale Degree Notation
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

	const octave = Note.octave(note_name);
	// Get the note object and the enharmonic note object
	const simple_note_name = Note.simplify(note_name);
	const enharmonic_name = Note.simplify(Note.enharmonic(note_name));

	// Get the scale object and the scale pitch classes
	const scale_obj = Scale.get(scale_name);
	const scale_pitch_classes = scale_obj.notes.map(n => Note.simplify(Note.pitchClass(n)))

	// use a Set object to remove duplicate posibilities (natural notes)
	const note_options = [...new Set([ simple_note_name, enharmonic_name ])];

	// Take the note options and find the one in scale. ?? if not in scale, return the original note name 
	const scale_correct_name = note_options.filter( note => scale_pitch_classes.includes(Note.pitchClass(note)))[0] ?? note_name;
	const scale_correct_note_obj = Note.get( Note.simplify(scale_correct_name) );
	
	// Find the index of the note in the scale
	const in_scale_idx = scale_pitch_classes.findIndex(n => n === Note.pitchClass(scale_correct_name));
	// Find the interval; If not in scale, return false
	const in_scale_val = scale_obj.intervals[in_scale_idx] ? scale_obj.intervals[in_scale_idx] : false;

	// Interval Quality Notation
	const interval = scale_obj.intervals[in_scale_idx] ?? false
	// Scale Degree Notation
	const degree = in_scale_val ? interval_to_degree(in_scale_val).replace('#', '♯').replace('b', '♭') : false
	
	return { 
		note_obj : scale_correct_note_obj, 
		noteName : scale_correct_note_obj.name,
		interval,
		degree,
		inScale : interval || degree ? true : false,
		scaleAcc : scale_correct_note_obj.acc,
		isRootNote : scale_correct_note_obj.pc === Note.get(current_key).pc
	}
}

const calc_fretboard_data = (currentTuning, numFrets=13, currentKey, currentScale) => {

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
			const parsed_note = note_acc_to_scale(fret_note_name, curr_key_scale, currentKey );

			// Take the parsed note and add the string and fret data, and push it to the fretboard_data array
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



const change_str_case = (str, opt = 'upper') => {
	let new_str;
  
	if (opt === 'upper') {
	  new_str = str
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
	} else if (opt === 'lower') {
	  new_str = str
		.split(' ')
		.map(word => word.charAt(0).toLowerCase() + word.slice(1))
		.join(' ');
	} else if (opt === 'css') {
	  new_str = str
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/#/g, 'sharp') // Replace '#' with 'sharp'
		.replace(/'/g, '') // Remove apostrophes
		.toLowerCase(); // Convert the entire string to lowercase
	} else {
	  throw new Error('Invalid option. Use "upper", "lower", or "css".');
	}
  
	return new_str;
}


const calc_color = (currentScale) => {
	let scale_str = change_str_case( currentScale, 'lower' )
	const scale_idx = custom_ordered_scale_names.indexOf(scale_str);
	let color_data_arr = Object.values(color_data);

	// Randomize Colors
	//color_data_arr = shuffle_array(color_data_arr);

	return color_data_arr[ scale_idx % color_data_arr.length ]
}


export { 
	change_str_case, 
	calc_fretboard_data, 
	interval_to_degree, 
	get_core_note, 
	calc_color, 
	shuffle_array 
}