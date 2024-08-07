import '../styles/field-group.scss';
export default function FieldGroup(props) {
	return (
		<fieldset className={`fieldgroup fieldgroup--${props.selectorName} control-panel__${props.selectorName} ${props.isBooleanSwitch ? 'fieldgroup--boolean-switch' : ''}`}>
			<legend className={`legend legend--${props.selectorName}`}>{props.legendString}</legend>
			{props.children}
		</fieldset>
	)
}