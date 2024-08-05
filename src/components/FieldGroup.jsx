import { useState } from 'react'

export default function FieldGroup(props) {
	return (
		<fieldset className={`control-panel__fieldset control-panel__fieldset--${props.selectorName}`}>
			<legend className={`control-panel__legend control-panel__legend--${props.selectorName}`}>{props.legendString}</legend>
			{props.children}
		</fieldset>
	)
}


