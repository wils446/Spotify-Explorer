import { ISpotify } from "../../api/spotify/interfaces/ISearchTrackResult";
import SpotifyAPI from "../../api/spotify/spotify";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../LoadingSpinner";
import TrackCard from "../TrackCard";

type SearchResultProps = {
	query: string;
};

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
	const spotifyApi = new SpotifyAPI();
	const { isLoading, data, error } = useFetch<ISpotify>(() => spotifyApi.searchTrack(query));

	if (isLoading)
		return (
			<div className="text-center mx-auto mt-10">
				<LoadingSpinner />
			</div>
		);

	if (error)
		return (
			<div>
				<span>An Error Occurred...</span>
			</div>
		);

	const tracks = data?.tracks.items;

	return (
		<>
			<div className="mx-auto">
				<div className="flex flex-wrap justify-center">
					{tracks!.map((track, index) => {
						return (
							<div className="mx-2 mb-4" key={index}>
								<TrackCard
									title={track.name}
									img={track.album.images[0].url}
									artist={track.artists[0].name}
									url={track.href}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default SearchResult;
