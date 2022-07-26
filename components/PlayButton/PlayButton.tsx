import styles from "./PlayButton.module.css";

type PlayButtonProps = {
	onButtonClick: () => void;
};

const PlayButton: React.FC<PlayButtonProps> = ({ onButtonClick }) => {
	return (
		<button onClick={onButtonClick} className={styles["play-button"]}>
			<div className={styles["play-icon"]}></div>
		</button>
	);
};

export default PlayButton;
