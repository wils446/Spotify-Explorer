import style from "./SearchInput.module.css";

type Props = {
	onChange: (value: string) => void;
	onKeyDown: () => void;
};

const SearchInput: React.FC<Props> = ({ onChange, onKeyDown }) => {
	return (
		<>
			<input
				type="text"
				className={style["input-text"]}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => e.key === "Enter" && onKeyDown()}
				placeholder="Search for an artist, album, or track"
			/>
		</>
	);
};

export default SearchInput;
