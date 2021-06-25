import React, { useContext, useEffect } from 'react';

import { IEpisodeProps } from './interfaces';
import { Store } from './Store';
import { fetchDataAction, toggleFavAction } from './Actions';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function HomePage() {
	const { state, dispatch } = useContext(Store);

	useEffect(() => {
		state.episodes.length === 0 && fetchDataAction(dispatch);
	});

	const props: IEpisodeProps = {
		episodes: state.episodes,
		store: { state, dispatch },
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
