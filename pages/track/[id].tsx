import { NextPage, NextPageContext } from "next";
import { TrackInfo } from "../../api/spotify/interfaces/ITrackInfo";
import SpotifyAPI from "../../api/spotify/spotify";
import { Head, LoadingSpinner } from "../../components";
import PlayButton from "../../components/PlayButton";
import useFetch from "../../hooks/useFetch";
import styles from "../../styles/Track.module.css";

type PageProps = {
	id: string;
};

export const getServerSideProps = async (context: NextPageContext) => {
	const { id } = context.query;

	return {
		props: { id },
	};
};

const track: NextPage<PageProps> = ({ id }) => {
	const spotifyApi = new SpotifyAPI();
	const { isLoading, data, error } = useFetch<TrackInfo>(() =>
		spotifyApi.getTrackInfo(id as string)
	);

	const onPlayButtonClick = () => {
		if (!data) return;

		window.open(data.external_urls.spotify, "_blank");
	};

	const msToTime = (ms: number) => {
		const minutes = Math.floor(Math.trunc(ms / 60000));
		const seconds = Math.floor((ms % 60000) / 1000);

		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	if (isLoading)
		return (
			<>
				<LoadingSpinner />
			</>
		);
	if (error) return <>{error}</>;

	return (
		<>
			<Head title={`Spotify Explorer | ${data?.name}`} />
			<div className={styles.layout}>
				<div className={styles["layout-container"]}>
					<div className={styles["track-background"]}>
						<div className="flex drop-shadow-md">
							<div>
								<img
									className={styles["track-image"]}
									src={data?.album.images[0].url}
									alt="image"
								/>
							</div>
							<div className="grow">
								<div className={styles["track-info"]}>
									<div className="grow">
										<div className={styles["track-title"]}>{data?.name}</div>
										<div className={styles["track-artist"]}>{data?.artists[0].name}</div>
									</div>
									<div className="pr-20">
										<PlayButton onButtonClick={onPlayButtonClick} />
									</div>
								</div>
							</div>
						</div>
						<div className={styles["track-description"]}>
							<h1 className={styles["track-description-text"]}>Popularity : {data?.popularity}</h1>
							<h1 className={styles["track-description-text"]}>
								Duration : {data && msToTime(data?.duration_ms)}
							</h1>
							<h1 className={styles["track-description-text"]}>
								Album Release Date : {data?.album.release_date}
							</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default track;
