// Data.jsx

import { Scale } from 'tonal';


// const colors = [
// 	'#ED174F', // Bright Red
// 	'#F47A20', // Orange
// 	'#cda600', // Gold
// 	'#7BD32F', // Lime Green
// 	'#00B1B0', // Teal
// 	'#0081C1', // Azure Blue
// 	'#8522B2', // Purple
// ];



const composite_scale_names = (original, reordered) => {
	const unique_reordered = [...new Set(reordered)];
	const remaining_names = original.filter(name => !unique_reordered.includes(name));
	return [...unique_reordered, ...remaining_names];
}

const custom_ordered_scale_names = composite_scale_names(Scale.names(), [
	'custom',
	'major',
	'major pentatonic',
	'minor pentatonic',
	'major blues',
	'minor blues',
	'minor',
	'harmonic minor',
	'melodic minor',
	'ionian',
	'dorian',
	'phrygian',
	'lydian',
	'mixolydian',
	'aeolian',
	'locrian',
	'bebop',
	'chromatic'
]);



let color_data = {
	red: {
		main: "#ff275f",
		dark: "#cb1846",
	},
	orange: {
		main: "#fe8e26",
		dark: "#BD6A1D",
	},
	// gold: {
	// 	main: "#f2bf0a",
	// 	dark: "#AE8D16",
	// },
	green: {
		main: "#29d985",
		dark: "#018C62",
	},
	teal: {
		main: "#00e2e1",
		dark: "#008d8d",
	},
	blue: {
		main: "#2288ff",
		dark: "#0959a2",
	},
	purple: {
		main: "#ba2aff",
		dark: "#6d278d",
	},
	violet: {
		main: "#6a45ff",
		dark: "#310099",
	}
}




const key_list = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B' ]


// const chromatic_scale = Object.values(all_notes).map(note => note.name);

const tuning_options = [
	{
	   name: 'Standard',
	   notes: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']
	}, {
	   name: 'Half Step Down',
	   notes: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4']
	}, {
	   name: 'Whole Step Down',
	   notes: ['D2', 'G2', 'C3', 'F3', 'A3', 'D4']
	}, {
	   name: 'Drop D',
	   notes: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4']
	}, {
	   name: 'Open D',
	   notes: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4']
	}, {
	   name: 'DADGAD',
	   notes: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4']
	}, {
	   name: 'Open E',
	   notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4']
	}, {
	   name: 'Open E Alternative',
	   notes: ['E2', 'A2', 'B2', 'E3', 'B3', 'E4']
	}, {
	   name: 'Open G',
	   notes: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4']
	}, {
		name: 'Double Drop D',
		notes: ['D2', 'A2', 'D3', 'G3', 'B3', 'D4']
	}, {
		name: 'Drop C',
		notes: ['C2', 'G2', 'C3', 'F3', 'A3', 'D4']
	}, {
		name: 'C Standard',
		notes: ['C2', 'F2', 'Bb2', 'Eb3', 'G3', 'C4']
	}, {
		name: 'Drop B',
		notes: ['B1', 'F#2', 'B2', 'E3', 'G#3', 'C#4']
	}, {
		name: 'Open C',
		notes: ['C2', 'G2', 'C3', 'G3', 'C4', 'E4']
	}, {
	   name: 'Rain Song',
	   notes: ['D2', 'G2', 'C3', 'G3', 'C4', 'D4']
	}, {
	   name: 'Rain Song (Live)',
	   notes: ['E2', 'A2', 'D3', 'A3', 'D4', 'E4']
	}, {
	   name: 'Bass Standard',
	   notes: ['E1', 'A1', 'D2', 'G2']
	}, {
	   name: 'Bass 5-String Standard',
	   notes: ['B0', 'E1', 'A1', 'D2', 'G2']
	}, {
	   name: 'Ukulele Standard',
	   notes: ['G4', 'C4', 'E4', 'A4']
	}, {
	   name: 'Mandolin Standard',
	   notes: ['G3', 'D4', 'A4', 'E5']
	}, {
	   name: 'Banjo Standard',
	   notes: ['G4', 'D3', 'G3', 'B3', 'D4']
	}
]



const piano_keys = [
	{ 
		semitone_position: 0,
		interval: "1P", 
		type: "natural", 
		col_start: 'col-start-1'
	},
	{ 
		semitone_position: 1,
		interval: "2m", 
		type: "accidental",	
		col_start: 'col-start-2' 
	},
	{ 
		semitone_position: 2,
		interval: "2M", 
		type: "natural", 
		col_start: 'col-start-3' 
	},
	{ 
		semitone_position: 3,
		interval: "3m", 
		type: "accidental", 
		col_start: 'col-start-4' 
	},
	{ 
		semitone_position: 4,
		interval: "3M", 
		type: "natural", 
		col_start: 'col-start-5' 
	},
	{ 
		semitone_position: 5,
		interval: "4P", 
		type: "natural", 
		col_start: 'col-start-7' 
	},
	{ 
		semitone_position: 6,
		interval: "Tri", 
		type: "accidental", 
		col_start: 'col-start-8' 
	},
	{ 
		semitone_position: 7,
		interval: "5P", 
		type: "natural", 
		col_start: 'col-start-9' 
	},
	{ 
		semitone_position: 8,
		interval: "6m", 
		type: "accidental", 
		col_start: 'col-start-10' 
	},
	{ 
		semitone_position: 9,
		interval: "6M", 
		type: "natural", 
		col_start: 'col-start-11' 
	},
	{ 
		semitone_position: 10,
		interval: "7m", 
		type: "accidental", 
		col_start: 'col-start-12' 
	},
	{ 
		semitone_position: 11,
		interval: "7M", 
		type: "natural", 
		col_start: 'col-start-13' 
	}
];


export { tuning_options, color_data, key_list, custom_ordered_scale_names, piano_keys }