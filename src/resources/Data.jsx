import { Scale } from 'tonal'
import { str_to_css_selector } from './Utils'

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



const colors = [
	'#ED174F',
	'#F47A20',
	'#cda600',
	'#7BD32F',
	'#00B1B0',
	'#0081C1',
	'#8522B2',
	'#ED174F',
	'#00B1B0',
]

const scale_colors = Scale.names().map( (scale_name, i) => ( 
	{ 
		colorname: str_to_css_selector(scale_name), 
		color: colors[i % (colors.length - 1)] 
	} 
))

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

export { tuning_options, scale_colors, key_list }