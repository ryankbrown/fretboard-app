import { useState } from "react";
import "../styles/tab-panel.scss";

const TabPanel = (props) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={`tabpanel ${props.contentWrapperClasses}`}>
            <div className="tabpanel__nav">
                {props.tabData.map((tab, index) => (
                    <button
                        key={index}
                        className={`tabpanel__nav-btn tabpanel__nav-btn--${
                            tab.selectorName
                        } ${
                            activeTab === index
                                ? "tabpanel__nav-btn--active"
                                : ""
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        { tab.title }
                    </button>
                ))}
            </div>
            <div className="tabpanel__content">
                {props.tabData.map((tab, index) => (
                    <div
                        key={index}
                        className={`tabpanel__panel ${
                            activeTab === index
                                ? "tabpanel__panel--active"
                                : ""
                        } ${tab.addedClasses}`}
                    >
                        { tab.content }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabPanel;
