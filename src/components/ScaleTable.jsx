import { useState } from "react";
import * as Tone from "tone";
import { Note,Scale } from "tonal";
import { interval_to_degree } from "../resources/Utils";
import "../styles/scale-table.scss";

const ScaleTable = (props) => {
	
    const scale_data = Scale.get(`${props.currentKey} ${props.currentScale}`);
    const scale_degrees = scale_data.intervals.map((interval) => interval);

    // Playing
    const [isPlaying, setIsPlaying] = useState(false);

    const playScale = async ()=> {
        await Tone.start();
        if (!isPlaying) {
            console.log('playing scale');
            setIsPlaying(true);

            const scale = Scale.get(`${props.currentKey}3 ${props.currentScale}`).notes;

            // Create a sequence with the scale notes
            const seq = new Tone.Sequence((time, note) => {
                props.synth.triggerAttackRelease(note, '8n', time);
            }, scale, '4n');

            // Start the sequence and the audio context
            Tone.Transport.start();
            seq.start();

            // Stop the sequence after playing all notes
            Tone.Transport.schedule(() => {
                seq.stop();
                Tone.Transport.stop();
            }, `${scale.length}*4n`);

        } else {
            setIsPlaying(false);
            console.log('scale stopped')
        }
    }


    return (
        <>
            <table className="info-section">
                <thead>
                    <tr>
                        <th
                            className="info-section__title"
                            colSpan={scale_data.notes.length + 1}
                        >
                            {`
                                ${props.currentKey.replace('#', '♯').replace('b', '♭')} 
                                ${props.currentScale.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            `}
                            <button
                                className="info-section__btn info-section__btn--play-scale"
                                onClick={playScale}
                            >{ isPlaying ? 'Stop' : 'Play'}</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="info-section__header">Scale Degrees</th>
                        {
                            scale_degrees.map((d, i) => (
                                <td key={i} className="scale-degree">{interval_to_degree(d).replace('#', '♯').replace('b', '♭')}</td>
                            ))
                        }
                    </tr>
                    <tr>
                        <th className="info-section__header">Scale Notes</th>
                        {
                            scale_data.notes.map((n, i) => (
                                <td key={i} className="scale-note">{Note.simplify(n).replace('#', '♯').replace('b', '♭')}</td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default ScaleTable;
