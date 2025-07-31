// TabPanel.jsx

import { useState } from "react";

const TabPanel = (props) => {
	
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div
			className={`tabpanel-wrapper grid grid-cols-1 grid-rows-[auto_1fr] ${props.injectedContentClasses ?? ""} `}
		>
			<div className={`tabpanel__nav flex`}>
				{props.tabData.map((tab, index) => (
					<button
						key={index}
						className={`tabpanel__nav-btn tabpanel__nav-btn--${tab.selectorName} cursor-pointer rounded-t rounded-b-none border-l border-white/10 bg-none px-3 py-2 last:border-r ${activeTab === index ? "tabpanel__nav-btn--active border-t-2 border-t-[var(--primary-highlight-color)] text-white" : "border-t text-white/50"}`}
						onClick={() => setActiveTab(index)}
					>
						{tab.title}
					</button>
				))}
			</div>
			<div
				className={`tabpanel__content grid w-fit [grid-template-areas:'content'] ${props.injectedContentClasses || ""}`}
			>
				{props.tabData.map((tab, index) => (
					<div
						key={index}
						className={`tabpanel__panel  relative  [grid-area:content] ${activeTab === index ? "tabpanel__panel--active pointer-events-auto z-20 opacity-100" : "pointer-events-none opacity-0 z-10"} ${tab.addedClasses}`}
					>
						{tab.content}
					</div>
				))}
			</div>
		</div>
	);
};

export default TabPanel;
