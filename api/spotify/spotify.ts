import axios from "axios";
import qs from "qs";
import { Tracks } from "./interfaces/ISearchTrackResult";
import { TrackInfo } from "./interfaces/ITrackInfo";

class SpotifyAPI {
	BaseURL = "https://api.spotify.com/v1";
	clientId = process.env.SPOTIFY_CLIENT_ID as string;
	clientSecret = process.env.SPOTIFY_CLIENT_SECRET as string;

	public async getTrackInfo(trackId: string): Promise<TrackInfo | undefined> {
		const apiUrl = `${this.BaseURL}/tracks/${trackId}`;

		try {
			const accessToken = await this.getAuth();
			const response = await axios.get(apiUrl, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					id: this.clientId,
				},
			});

			return response.data;
		} catch (err) {
			console.log(err);
		}
	}

	public async searchTrack(query: string): Promise<Tracks | undefined> {
		const apiUrl = `${this.BaseURL}/search`;

		try {
			const accessToken = await this.getAuth();
			const response = await axios.get(apiUrl, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				params: {
					q: query,
					type: "track",
					limit: 50,
				},
			});

			return response.data;
		} catch (err) {
			console.log(err);
		}
	}

	private async getAuth(): Promise<string | undefined> {
		try {
			const tokenURL = "https://accounts.spotify.com/api/token";
			const data = qs.stringify({ grant_type: "client_credentials" });
			const authToken = new Buffer(`${this.clientId}:${this.clientSecret}`).toString("base64");

			const response = await axios.post(tokenURL, data, {
				headers: {
					Authorization: `Basic ${authToken}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			return response.data.access_token;
		} catch (err) {
			console.log((err as Error).message);
		}
	}
}

export default SpotifyAPI;
