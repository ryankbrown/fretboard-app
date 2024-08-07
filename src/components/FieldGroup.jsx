import '../styles/field-group.scss';
export default function FieldGroup(props) {
	return (
		<fieldset className={`fieldgroup fieldgroup--${props.selectorName} control-panel__${props.selectorName} ${props.isBooleanSwitch ? 'fieldgroup--boolean-switch' : ''}`}>
			<legend className={`legend legend--${props.selectorName}`}>{props.legendString}</legend>
			<div className={`fieldgroup__content fieldgroup__content--${props.selectorName} ${props.contentWrapperClasses ? props.contentWrapperClasses : ''}`}>
				{props.children}
			</div>
		</fieldset>
	)
}