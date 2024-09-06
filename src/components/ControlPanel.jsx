import { useState } from "react";
import { Scale, Note } from "tonal";

import Toggler from "./Toggler";
import Dropdown from "./Dropdown";
import FieldGroup from "./FieldGroup";
import Stepper from "./Stepper";
import Tuner from "./Tuner";
import TabPanel from "./TabPanel";

import { tuning_options } from "../resources/Data";

import "../styles/control-panel.scss";

export default function ControlPanel(props) {
    const [tunerRemoverState, setTunerRemoverState] = useState(false);

    const addTuner = () => {
        setTunerRemoverState(false);
        if (props.currentTuning.notes.length < props.maxTuners) {
            // document.startViewTransition(()=> {
            props.setCurrentTuning({
                name: "Custom Tuning",
                notes: [...props.currentTuning.notes, "E2"],
            });
            // })
        }
    };

    const min_tuner_spaces = 6;

    return (
        <>
            <div className="control-panel">
                {/* <h3 className="control-panel__title">{`Options`}</h3> */}
                {/* Scale */}
                <FieldGroup selectorName="scale" legendString="Scale">
                    <Dropdown
                        id="scale-select"
                        options={Scale.names()}
                        selectedValue={props.currentScale}
                        setValue={props.handleScaleSelection}
                    />
                </FieldGroup>

                {/* Modify Scale */}
                <FieldGroup
                    selectorName="modifyscale"
                    legendString="Modify Scale"
                >
                    <div style={{ color: "gray" }}>
                        Modify Scale Content Here
                    </div>
                </FieldGroup>

                {/* Select Key */}
                <FieldGroup
                    selectorName="key"
                    legendString="Select Key"
                    contentWrapperClasses="control-panel__key-wrapper"
                >
                    {props.keyList.map((k) => (
                        <Toggler
                            key={k}
                            id={`key-option--${k}`}
                            label={Note.get(k)
                                .name.replace("b", "♭")
                                .replace("#", "♯")}
                            inputType="radio"
                            checked={k === "C" ? true : false}
                            value={k}
                            selectedValue={props.currentKey}
                            setValue={props.setCurrentKey}
                        ></Toggler>
                    ))}
                </FieldGroup>

                {/* Note Type */}
                <FieldGroup
                    selectorName="notetype"
                    legendString="Note Type"
                    isBooleanSwitch={true}
                >
                    <Toggler
                        inputType="radio"
                        id="notes"
                        label="Show Notes"
                        value="notes"
                        selectedValue={props.noteType}
                        setValue={props.setNoteType}
                    />
                    <Toggler
                        inputType="radio"
                        id="degrees"
                        label="Show Degrees"
                        value="degrees"
                        selectedValue={props.noteType}
                        setValue={props.setNoteType}
                    />
                </FieldGroup>

                {/* Scheme */}
                <FieldGroup
                    selectorName="scheme"
                    legendString="Interface Scheme"
                    isBooleanSwitch={true}
                >
                    <Toggler
                        inputType="radio"
                        id="scheme-light"
                        label="Light Scheme"
                        value="scheme-light"
                        selectedValue={props.interfaceScheme}
                        setValue={props.setInterfaceScheme}
                    />
                    <Toggler
                        inputType="radio"
                        id="scheme-dark"
                        label="Dark Scheme"
                        value="scheme-dark"
                        selectedValue={props.interfaceScheme}
                        setValue={props.setInterfaceScheme}
                    />
                </FieldGroup>

                {/* Num Frets */}
                <FieldGroup
                    selectorName="num-frets"
                    legendString="Number of Frets"
                >
                    <Stepper
                        id="num-frets"
                        value={props.numFrets}
                        displayValue={props.numFrets - 1}
                        decreaseString="-"
                        increaseString="+"
                        setValue={props.handleSetNumFrets}
                    />
                </FieldGroup>

                {/* Tuning */}
                <FieldGroup
                    selectorName="tuning"
                    legendString="Tuning Controls"
                    contentWrapperClasses="control-panel__modify-tuning-wrapper"
                >
                    <TabPanel
                        selectorName="tuning"
                        // contentWrapperClasses="control-panel__tuning-wrapper"
                        tabData={[
                            
							//* Tuning Select Panel
                            {
                                title: "Tuning Select",
                                selectorName: "tuning-select",
                                addedClasses: "control-panel__tuning-select-panel",
                                content: (
                                    <Dropdown
                                        id="tuning-select"
                                        options={Object.values(tuning_options).map((s) => s.name)}
                                        selectedValue={props.currentTuning.name}
                                        setValue={(new_val) => {
                                            const new_tuning = tuning_options.find( (t) => t.name === new_val);
                                            props.setCurrentTuning(new_tuning);
                                            setTunerRemoverState(false);
                                        }}
                                    />
                                ),
                            },

							//* Modify Tuning Panel
                            {
                                title: "Modify Tuning",
                                selectorName: "modify-tuning",
                                addedClasses: "control-panel__modify-tuning-wrapper",
                                content: (
                                    <>
                                        <div className="control-panel__tuning-controls">
                                            <button
                                                className="control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--add"
                                                onClick={addTuner}
                                                disabled={props.currentTuning.notes.length === props.maxTuners}
                                            >
                                                {/* Add Icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13.948" stroke="#3F3F3F" strokeWidth="1"/><path stroke="#fff" strokeWidth="1" d="M15 7.5v15m7.5-7.5h-15"/></svg>
                                                <span>Add</span>
                                            </button>
                                            <button
                                                className={`control-panel__tuner-ctrl-btn control-panel__tuner-ctrl-btn--remove ${ tunerRemoverState ? "--active" : "" }`}
                                                onClick={() => setTunerRemoverState((prevValue) => prevValue ? false : true )
                                                }
                                                disabled={props.currentTuning.notes.length === 1}
                                            >
                                                {/* Remove Icon */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 30 30"><circle cx="15" cy="15" r="13.948" stroke="#3F3F3F" strokeWidth="1"/><path stroke="#fff" strokeWidth="1" d="M22.5 15h-15"/></svg>
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                        <div
                                            className="control-panel__tuning-wrapper"
                                            style={{
                                                ["--num-tuners"]: Math.max(min_tuner_spaces, props.currentTuning.notes.length)
                                            }}
                                        >
                                            {props.currentTuning.notes.map(
                                                (tuner_val, idx) => (
                                                    <Tuner
                                                        key={`tunger--pos-${idx}`}
                                                        tunerId={idx}
                                                        currentTuning={props.currentTuning}
                                                        tunerValue={tuner_val}
                                                        setCurrentTuning={props.setCurrentTuning}
                                                        tunerRemoverState={tunerRemoverState}
                                                    />
                                                )
                                            )}
                                            {props.currentTuning.notes.length <
                                                min_tuner_spaces &&
                                                [...Array(6 - props.currentTuning.notes.length)].map((_, i) => (
                                                    <div
                                                        key={`tuner--empty-${i}`}
                                                        className="tuner tuner--empty"
                                                    ></div>
                                                ))}
                                        </div>
                                    </>
                                ),
                            },
                        ]}
                    />
                </FieldGroup>
            </div>
        </>
    );
}
