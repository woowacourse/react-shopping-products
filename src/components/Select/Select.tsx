interface Option {
	value: string;
	label: string;
}

interface SelectProps {
	value: string;
	options: readonly Option[];
	onChange: (value: string) => void;
}

const Select = ({ value, options, onChange }: SelectProps) => {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)}>
			{options.map(({ value, label }) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	);
};

export default Select;
