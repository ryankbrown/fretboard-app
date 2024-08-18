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
		notes: ['E', 'A', 'D', 'G', 'B', 'E']
	}, {
		name: 'Half Step Down',
		notes: ['D♯/E♭', 'G♯/A♭', 'C♯/D♭', 'F♯/G♭', 'A♯/B♭', 'D♯/E♭']
	}, {
		name: 'Whole Step Down',
		notes: ['D', 'G', 'C', 'F', 'A', 'D']
	}, {
		name: 'Drop D',
		notes: ['D', 'A', 'D', 'G', 'B', 'E']
	}, {
		name: 'Open D',
		notes: ['D', 'A', 'D', 'F♯/G♭', 'A', 'D']
	}, {
		name: 'DADGAD',
		notes: ['D', 'A', 'D', 'G', 'A', 'D']
	}, {
		name: 'Open E',
		notes: ['E', 'B', 'E', 'G♯/A♭', 'B', 'E']
	}, {
		name: 'Open E Alternative',
		notes: ['E', 'A', 'B', 'E', 'B', 'E']
	}, {
		name: 'Open G',
		notes: ['D', 'G', 'D', 'G', 'B', 'D']
	}, {
		name: 'Rain Song',
		notes: ['D', 'G', 'C', 'G', 'C', 'D']
	}, {
		name: 'Rain Song (Live)',
		notes: ['E', 'A', 'D', 'A', 'D', 'E']
	}, {
		name: 'Bass Standard',
		notes: ['E', 'A', 'D', 'G']
	}, {
		name: 'Bass 5-String Standard',
		notes: ['B', 'E', 'A', 'D', 'G']
	}, {
		name: 'Ukulele Standard',
		notes: ['G', 'C', 'E', 'A']
	}, {
		name: 'Mandolin Standard',
		notes: ['G', 'D', 'A', 'E']
	}, {
		name: 'Banjo Standard',
		notes: ['G', 'D', 'G', 'B', 'D']
	}

]

export { tuning_options, scale_colors, key_list }