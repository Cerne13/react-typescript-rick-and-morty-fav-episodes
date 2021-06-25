import React, { useContext } from 'react';
import { Store } from './Store';
import { toggleFavAction } from './Actions';
import { IEpisodeProps } from './interfaces';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function FavPage(): JSX.Element {
	const { state, dispatch } = useContext(Store);

	const props: IEpisodeProps = {
		episodes: state.favorites,
		store: { state, dispatch },
		toggleFavAction,
		favorites: state.favorites,
	};

	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<div className='episode-layout'>
				<EpisodeList {...props} />
			</div>
		</React.Suspense>
	);
}
