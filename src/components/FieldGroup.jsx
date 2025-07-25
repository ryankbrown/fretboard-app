// import '../styles/field-group.scss';


export default function FieldGroup(props) {

	const fieldset_styles = `w-full p-4 border-[.1rem] border-white/[.1] m-0 grid grid-cols-1 grid-rows-[min-content_1fr] [grid-template-areas:'legend''content'] gap-2`;

	const boolean_switch_styles = `flex flex-row font-semibold text-sm`;

	return (
		<fieldset className={
			`fieldgroup--${props.selectorName} control-panel__${props.selectorName} ${fieldset_styles} ${props.injectedClasses}`}
		>
			<legend className={`row-span-1 [grid-area:legend] text-sm font-semibold ${props.injectedLegendClasses}`}>{props.legendString}</legend>

			<div className={`fieldgroup__content fieldgroup__content--${props.selectorName}  ${ props.isBooleanSwitch ? boolean_switch_styles : '' } ${ props.injectedContentClasses ? props.injectedContentClasses : ''} `}>
				{props.children}
			</div>

		</fieldset>
	)
}