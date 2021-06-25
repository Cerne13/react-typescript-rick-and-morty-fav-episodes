import { IAction, IEpisode, IState } from './interfaces';

export const fetchDataAction = async (dispatch: any) => {
	const URL = 'https://api.tvmaze.com/shows/216?&embed=episodes';

	const data = await fetch(URL);
	const dataJSON = await data.json();
	return dispatch({
		type: 'FETCH',
		payload: dataJSON._embedded.episodes,
	});
};

export const toggleFavAction = (
	state: IState,
	dispatch: any,
	ep: IEpisode | any
): IAction => {
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
