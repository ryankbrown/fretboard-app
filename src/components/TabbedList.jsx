export function TabbedList(props) {
	return (
		<div className="tablist">
			<nav aria-label="Tab Navigation">
				<ul role="tablist">{
					props.children.map( (tab, i) => (
						<li 
							key={`tabitem-${i}`}
							className={`tablist__nav-item tablist__nav-item--${i}`} 
							role="presentation" 
							aria-selected={props.}
							aria-controls={`tab${i}-content`} 
							id={`tablist__nav-item--${i}`}
						>
							<button
								className={`tablist__nav-btn`}
							>{tab.name}</button>
						</li>
					))
				}</ul>
			</nav>
			{
				props.children.map( (tab, i) => (
					<div 
						key={`tabcontent-${i}`}
						role="tabpanel" 
						id={`tab--${tab.id}`}
						aria-labeledby="tab1"
					>{
						tab.content
					}</div>
				))
			}
		</div>
	)
}