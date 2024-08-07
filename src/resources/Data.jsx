const all_notes = {
	c_ntrl 	:	{
		name 	: 'C',
		note_class :	'note__C',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 0
	},
	c_sharp_d_flat :	{
		name 	: 'C#/D♭',
		note_class :	'note__D-flat',
		natural : false,
		sharp : 'C',
		flat 	: 'D',
		indx 	: 1
	},
	d_ntrl :	{
		name 	: 'D',
		note_class :	'note__D',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 2
	},
	d_sharp_e_flat :	{
		name 	: 'D♯/E♭',
		note_class :	'note__E-flat',
		natural : false,
		sharp : 'D',
		flat 	: 'E',
		indx 	: 3
	},
	e_ntrl :	{
		name 	: 'E',
		note_class :	'note__E',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 4
	},
	f_ntrl :	{
		name 	: 'F',
		note_class :	'note__F',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 5
	},
	f_sharp_g_flat :	{
		name 	: 'F♯/G♭',
		note_class :	'note__G-flat',
		natural : false,
		sharp : 'F',
		flat 	: 'G',
		indx 	: 6
	},
	g_ntrl :	{
		name 	: 'G',
		note_class :	'note__G',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 7
	},
	g_sharp_a_flat :	{
		name 	: 'G♯/A♭',
		note_class :	'note__A-flat',
		natural : false,
		sharp : 'G',
		flat 	: 'A',
		indx 	: 8
	},
	a_ntrl :	{
		name 	: 'A',
		note_class :	'note__A',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 9
	},
	a_sharp_b_flat :	{
		name 	: 'A♯/B♭',
		note_class :	'note__B-flat',
		natural : false,
		sharp : 'A',
		flat 	: 'B',
		indx 	: 10
	},
	b_ntrl :	{
		name 	: 'B',
		note_class :	'note__B',
		natural : true,
		sharp : false,
		flat 	: false,
		indx 	: 11
	}
};

// --ionian: #ED174F;
// 	--dorian: #F47A20;
// 	--phrygian: #cda600;
// 	--lydian: #7BD32F;
// 	--mixolydian: #00B1B0;
// 	--aeolian: #0081C1;
// 	--locrian: #8522B2;
// 	--major-triad: #ED174F;
// 	--minor-triad: #00B1B0;
// 	--chromatic: #757575;
// 	--diminished-triads: #e94d76;
// 	--augmented-triads: #773275;

const scales = {
    ionian : {
        name 		: "Ionian (Major)",
        id 			: "ionian",
        steps		: [ 2, 2, 1, 2, 2, 2, 1 ],
        degrees		: ['1', '2', '3', '4', '5', '6', '7'],
		color		: '#ED174F'
    }, 
    dorian : {
        name 		: "Dorian",
        id 			: "dorian",
        steps		: [ 2, 1, 2, 2, 2, 1, 2 ],
        degrees		: ['1', '2', '♭3', '4', '5', '6', '♭7'],
		color		: '#F47A20'
    },
    phrygian : {
        name 		: "Phrygian",
        id 			: "phrygian",
        steps		: [ 1, 2, 2, 2, 1, 2, 2 ],
        degrees		: ['1', '♭2', '♭3', '4', '5', '♭6', '♭7'],
		color		: '#cda600'
    },
    lydian : {
        name 		: "Lydian",
        id 			: "lydian",
        steps		: [ 2, 2, 2, 1, 2, 2, 1 ],
        degrees		: ['1', '2', '3', '♯4', '5', '6', '7'],
		color		: '#7BD32F'
    },
    mixolydian : {
        name 		: "Mixolydian",
        id 			: "mixolydian",
        steps		: [ 2, 2, 1, 2, 2, 1, 2 ],
        degrees		: ['1', '2', '3', '4', '5', '6', '♭7'],
		color		: '#00B1B0'
    },
    aeolian : {
        name 		: "Aeolian (Minor)",
        id 			: "aeolian",
        steps		: [ 2, 1, 2, 2, 1, 2, 2],
        degrees		: ['1', '2', '♭3', '4', '5', '♭6', '♭7'],
		color		: '#0081C1'
    },
    locrian : {
        name 		: "Locrian",
        id 			: "locrian",
        steps		: [ 1, 2, 2, 1, 2, 2, 2 ],
        degrees		: ['1', '♭2', '♭3', '4', '♭5', '♭6', '♭7'],
		color		: '#8522B2'
    },
    chromatic : {
        name		: "Chromatic",
        id 			: "chromatic",
        steps		: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        degrees 	: ['1', '♭2', '2', '♭3','3', '4', '♭5', '5', '♭6', '6', '♭7', '7'],
		color		: '#757575'
    },
    major_triads : {
        name		: "Major Triads",
        id 			: "major-triads",
        steps		: [4, 3, 5],
        degrees 	: ['1', '3', '5'],
		color		: '#e94d76'
    },
    minor_triads : {
        name		: "Minor Triads",
        id 			: "minor-triads",
        steps		: [3, 4, 5],
        degrees		: ['1', '♭3', '5'],
		color		: '#773275'
    },
    diminished_triads : {
        name		: "Diminished Triads",
        id 			: "diminished-triads",
        steps		: [3, 3, 4],
        degrees		: ['1', '♭3', '♭5'],
		color		: '#e94d76'
    },
    augmented_triads : {
        name		: "Augmented Triads",
        id 			: "augmented-triads",
        steps		: [3, 4, 5],
        degrees		: ['1', '3', '♯5'],
		color		: '#773275'
    },
    dominant_triads : {
        name		: "Dominant Triads",
        id 			: "dominant-triads",
        steps		: [3, 4, 5],
        degrees		: ['1', '3', '♯5'],
		color		: '#773275'
    }
}

// const chromatic_scale = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
const chromatic_scale = Object.values(all_notes).map(note => note.name);


const tuning = ['E', 'B', 'G', 'D', 'A', 'E']
// const tuning = ['C', 'C', 'C', 'C', 'C', 'C']


export { tuning, chromatic_scale, all_notes, scales }