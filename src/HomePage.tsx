import React, { useContext, useEffect } from 'react';

import { IEpisode, IAction, IEpisodeProps } from './interfaces';
import { Store } from './Store';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function HomePage() {
	const { state, dispatch } = useContext(Store);

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

	const props: IEpisodeProps = {
		episodes: state.episodes,
		toggleFavAction,
		favorites: state.favorites,
	};

	return (
		<div>
			<React.Suspense fallback={<div>Loading...</div>}>
				<section className='episode-layout'>
					<EpisodeList {...props} />
				</section>
			</React.Suspense>
		</div>
	);
}
