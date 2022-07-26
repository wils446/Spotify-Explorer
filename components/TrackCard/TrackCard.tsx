import Link from "next/link";
import { useState } from "react";
import styles from "./TrackCard.module.css";

type TrackCardProps = {
	title: string;
	img: string;
	artist: string;
	url: string;
};

const TrackCard: React.FC<TrackCardProps> = ({ title, img, artist, url }) => {
	const [isHovering, setHovered] = useState(false);
	const onMouseEnter = () => setHovered(true);
	const onMouseLeave = () => setHovered(false);

	const trackId = url.split("/").pop();

	return (
		<Link href={`/track/${trackId}`}>
			<div
				className={`${styles["card-box"]} ${styles["card-hover"]}`}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<img src={img} alt="" className={styles["card-img"]} />
				<div className={`${styles["card-title"]}`}>
					{title.length > 15 ? title.substring(0, 15) + "..." : title}
				</div>
				<div className={`${styles["card-artist-name"]}`}>{artist}</div>
			</div>
		</Link>
	);
};

export default TrackCard;
