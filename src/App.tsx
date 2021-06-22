import React, { useContext, useEffect } from 'react';
import { Store } from './Store';

interface IEpisode {
	airdate: string;
	airstamp: string;
	airtime: string;
	id: number;
	image: {
		medium: string;
		original: string;
	};
	name: string;
	number: number;
	runtime: number;
	season: number;
	summary: string;
	url: string;
}

const App = (): JSX.Element => {
	const { state, dispatch } = useContext(Store);
	console.log(state);

	useEffect(() => {
		state.episodes.length === 0 && fetchDataAction();
	}, []);

	const fetchDataAction = async () => {
		const URL =
			'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';

		const data = await fetch(URL);
		const dataJSON = await data.json();
		return dispatch({
			type: 'FETCH',
			payload: dataJSON._embedded.episodes,
		});
	};

	return (
		<>
			{console.log(state)}
			<header className='header'>
				<h1>Rick and Morty</h1>
				<p>Pick your favourite episode!</p>
			</header>

			<section className='episode-layout'>
				{state.episodes.map((ep: IEpisode) => {
					return (
						<section key={ep.id} className='episode-box'>
							<img
								src={ep.image.medium}
								alt={`Rick and Morty ${ep.name}`}
							/>
							<div>{ep.name}</div>
							<section>
								Season: {ep.season} Episode: {ep.number}
							</section>
						</section>
					);
				})}
			</section>
		</>
	);
};

export default App;
