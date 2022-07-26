import { useEffect, useState } from "react";

type IUseFetchReturn<K> = {
	isLoading: boolean;
	data: K | null;
	error: string;
};

const useFetch = <K>(getDataFunc: () => Promise<any>): IUseFetchReturn<K> => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getDataFunc()
			.then((res) => {
				setData(res);
				setIsLoading(false);
			})
			.catch((err) => {
				setError((err as Error).message);
				setIsLoading(false);
			});
	}, []);

	return { isLoading, data, error };
};

export default useFetch;
