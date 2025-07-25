// import '../styles/play-pause-icon.scss';


export default function PlayPauseIcon(props) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
			className={
				`play-pause__svg w-full h-auto transition-transform duration-300 ease-in-out
				${ props.isPlaying ? 'play-pause__svg--playing' : 'play-pause__svg--paused'}`
			}
		>
			<defs>
				<clipPath id="play-pause__play-clip">
					{/* <path className="play-pause__play-shape" d="m17.9,11c.5-.24.7-.84.46-1.34-.1-.2-.26-.37-.46-.46L5.2,1c-.44-.33-1.07-.24-1.4.2-.13.17-.2.38-.2.6v16.6c0,.55.45,1,1,1,.22,0,.43-.07.6-.2l12.7-8.2Z" fill="white"></path> */}
					<path className="play-pause__play-shape" fill="white" d="M19.47 11a1 1 0 0 0 .46-1.34c-.1-.2-.26-.37-.46-.46L6.77 1a1.003 1.003 0 0 0-1.6.8v16.6a1.003 1.003 0 0 0 1.6.8l12.7-8.2Z" />
				</clipPath>
			</defs>
			<g clipPath="url(#play-pause__play-clip)">
				<rect className="play-pause__bar play-pause__bar--left" width="4.5" height="18.1" x="3" y=".9" rx=".6" ry=".6" transform="rotate(180 5.2 10)" fill="white"></rect>
				<rect className="play-pause__bar play-pause__bar--right" width="4.5" height="18.1" x="12.5" y=".9" rx=".6" ry=".6" transform="rotate(180 14.8 10)" fill="white"></rect>
			</g>
		</svg>
	)
}``