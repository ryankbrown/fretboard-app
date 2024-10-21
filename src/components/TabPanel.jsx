import { useState } from "react";
// import "../styles/tab-panel.scss";

const TabPanel = (props) => {
	 const [activeTab, setActiveTab] = useState(0);

	 return (
		  <div className={
			`tabpanel-wrapper 
			grid
			grid-cols-1
			grid-rows-[auto_1fr]
			${props.injectedContentClasses ?? ''}
			`
			}>
				<div className={
					`tabpanel__nav flex`
					}>
					 {props.tabData.map((tab, index) => (
						  <button
								key={index}
								className={
									`tabpanel__nav-btn 
									tabpanel__nav-btn--${tab.selectorName}
									cursor-pointer
									bg-none
									border-l
									last:border-r
									rounded-t
									rounded-b-none
									border-white/10
									px-3
									py-2

									${activeTab === index ? "tabpanel__nav-btn--active border-t-[var(--primary-highlight-color)] border-t-2 text-white" : "border-t text-white/50"}`
								}
								onClick={() => setActiveTab(index)}
						  >
								{ tab.title }
						  </button>
					 ))}
				</div>
				<div className={
					`tabpanel__content
					w-fit
					grid
					[grid-template-areas:'content']
					${props.injectedContentClasses || ''}`
					}>
					 {props.tabData.map((tab, index) => (
						  <div
								key={index}
								className={
									`tabpanel__panel 
									relative
									[grid-area:content]
									opacity-0
									z-10
									pointer-events-none

									${activeTab === index ? "tabpanel__panel--active opacity-100 z-20 pointer-events-auto" : ""} 
									${tab.addedClasses}`
							}
						  >
								{ tab.content }
						  </div>
					 ))}
				</div>
		  </div>
	 )
}

export default TabPanel;
