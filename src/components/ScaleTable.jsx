import { Note,Scale } from "tonal";
import { interval_to_degree } from "../resources/Utils";
import "../styles/scale-table.scss";

const ScaleTable = ({ currentKey, currentScale }) => {
	
    const scale_data = Scale.get(`${currentKey} ${currentScale}`);
    const scale_degrees = scale_data.intervals.map((interval) => interval);

    return (
        <table className="info-section">
            <thead>
                <tr>
                    <th
                        className="info-section__title"
                        colSpan={scale_data.notes.length + 1}
                    >
                        {currentKey} {
							currentScale.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
						}
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
    );
};

export default ScaleTable;
