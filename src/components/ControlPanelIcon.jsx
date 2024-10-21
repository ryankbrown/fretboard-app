import { useState } from "react";

// import "../styles/control-panel-icon.scss";

export default function ControlPanelIcon(props) {

    const [isActive, setIsActive] = useState(false);


    return (
        <button 
            className={
                `control-panel__btn
                ${ isActive ? 'active' : '' }
                z-[5]
                relative
                justify-self-end
                [grid-area:header]
                p-[unset]
                bg-transparent
                cursor-pointer
                or-ch:hidden
                or-ch:[grid-area:controlpanelicon]`
            } 
            // aria-role="button"
            data-state={ isActive ? "true" : "false" }
            onClick={ ()=> setIsActive(()=> !isActive) }
        >
            <svg
                className="cp-icon w-[3.5rem] or-ch:w-[4.5rem]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 35"
                aria-hidden="true"
                focusable="false"
            >
                <g className="cp-icon__line-group--top cp-icon__line-group">
                    <line
                        className="cp-icon__line--top cp-icon__line"
                        x1="9.11"
                        y1="17.5"
                        x2="25.89"
                        y2="17.5"
                        fill="#fff"
                        stroke="white"
                        strokeLinecap="butt"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                    />
                    <g className="cp-icon__input-group--top cp-icon__input-group">
                        <line
                            className="cp-icon__input-line--top cp-icon__input-line"
                            x1="17.5"
                            y1="15.75"
                            x2="17.5"
                            y2="19.25"
                            fill="#fff"
                            stroke="white"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                        />
                    </g>
                </g>
                <g className="cp-icon__line-group--mid cp-icon__line-group">
                    <line
                        className="cp-icon__line--mid cp-icon__line"
                        x1="9.11"
                        y1="17.5"
                        x2="25.89"
                        y2="17.5"
                        fill="#fff"
                        stroke="white"
                        strokeLinecap="butt"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                    />
                    <g className="cp-icon__input-group--mid cp-icon__input-group">
                        <line
                            className="cp-icon__input-line--mid cp-icon__input-line"
                            x1="17.5"
                            y1="15.75"
                            x2="17.5"
                            y2="19.25"
                            fill="#fff" 
                            stroke="white"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                        />
                    </g>
                </g>
                <g className="cp-icon__line-group--bot cp-icon__line-group">
                    <line
                        className="cp-icon__line--bot cp-icon__line"
                        x1="9.11"
                        y1="17.5"
                        x2="25.89"
                        y2="17.5"
                        fill="#fff"
                        stroke="white"
                        strokeLinecap="butt"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                    />
                    <g className="cp-icon__input-group--bot cp-icon__input-group">
                        <line
                            className="cp-icon__input-line--bot cp-icon__input-line"
                            x1="17.5"
                            y1="15.75"
                            x2="17.5"
                            y2="19.25"
                            fill="#fff"
                            stroke="white"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                        />
                    </g>
                </g>
            </svg>
        </button>
    )
}
