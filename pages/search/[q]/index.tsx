import { NextPage, NextPageContext } from "next";
import { Head, Navbar, SearchResult } from "../../../components";

type PageProps = {
	q: string;
};

export const getServerSideProps = (context: NextPageContext) => {
	const { q } = context.query;
	return { props: { q } };
};

const Search: NextPage<PageProps> = ({ q }) => {
	return (
		<>
			<Head title="Spotify Explorer" description={`Search for ${q}`} />
			<Navbar />
			<div className="container mx-auto mt-6">
				<SearchResult query={q as string} />
			</div>
		</>
	);
};

export default Search;
