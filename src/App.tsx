import React, { useContext, useEffect } from 'react';
import { Store } from './Store';
import { IEpisode, IAction } from './interfaces';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

const App = (): JSX.Element => {
	const { state, dispatch } = useContext(Store);
	// console.log(state);

	useEffect(() => {
		state.episodes.length === 0 && fetchDataAction();
	});

	const fetchDataAction = async () => {
		const URL = 'https://api.tvmaze.com/shows/216?&embed=episodes';

		const data = await fetch(URL);
		const dataJSON = await data.json();
		return dispatch({
			type: 'FETCH',
			payload: dataJSON._embedded.episodes,
		});
	};

	const toggleFavAction = (ep: IEpisode): IAction => {
		const episodeInFav = state.favorites.includes(ep);

		let dispatchObj = {
			type: 'ADD_FAV',
			payload: ep,
		};

		if (episodeInFav) {
			const favWithoutEpisode = state.favorites.filter(
				(fav: IEpisode) => fav.id !== ep.id
			);
			dispatchObj = {
				type: 'REMOVE_FAV',
				payload: favWithoutEpisode,
			};
		}
		return dispatch(dispatchObj);
	};

	const props = {
		episodes: state.episodes,
		toggleFavAction,
		favorites: state.favorites,
	};

	return (
		<>
			<header className='header'>
				<div>
					<h1>Rick and Morty</h1>
					<p>Pick your favourite episode!</p>
				</div>
				<div>Number of faved episodes: {state.favorites.length}</div>
			</header>

			<React.Suspense fallback={<div>Loading...</div>}>
				<section className='episode-layout'>
					<EpisodeList {...props} />
				</section>
			</React.Suspense>
		</>
	);
};

export default App;
