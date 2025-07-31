// ScaleToggler.jsx

export default function ScaleToggler(props) {

	const isActive = props.customScaleIntervals[props.value];

	const buttonStyles = `flex justify-center items-center text-center text-(--primary-light-text-color) text-xs font-semibold cursor-pointer rounded-t-[unset] rounded-b-md ${props.colStart} col-span-2 row-start-1`;

	const natStyles = `row-span-2 flex items-end ${ 
		isActive ? 
			'bg-(--primary-highlight-color)' 
			: 
			'bg-(--disabled-input-color)' }`;

	const accStyles = `row-span-1 z-2 ${ 
		isActive ? 
			'bg-(--primary-highlight-dark-color) shadow-md shadow-black/10' 
			: 
			'bg-(--disabled-input-dark-color)' }`

	
	// Function to handle piano key clicks
	const handlePianoKeyClick = () => {
		const interval = props.value;
		if (interval === '1P') return; // Root note can't be disabled

		if (interval === '4A' || interval === '4d') {
			props.setCustomScaleIntervals(prev => ({
				...prev,
				['Tri']: !prev['Tri']
			}));
		} else {
			props.setCustomScaleIntervals(prev => ({
				...prev,
				[interval]: !prev[interval]
			}));
		}
		
		// Switch to custom mode
		props.setIsCustomScaleMode(true);
		props.setCurrentScale('custom');
	};


	return (
		<>
			<button
				className={ 
					`scale-toggler__button scale-toggler__button ${buttonStyles} ${ props.noteQuality === 'accidental' ? accStyles : natStyles }  ${ props.injectedClasses || '' }` }
				onClick={ ()=> handlePianoKeyClick() }
			>
				{ props.children ? props.children : props.value }
			</button>
		</>
	)
}
