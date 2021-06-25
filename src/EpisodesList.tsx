import React from 'react';
import { IEpisode } from './interfaces';

export default function EpisodesList(props: any): Array<JSX.Element> {
	const { episodes, toggleFavAction, favorites } = props;

	return episodes.map((ep: IEpisode) => {
		return (
			<section key={ep.id} className='episode-box'>
				<img
					src={ep.image ? ep.image.medium : ''}
					alt={`Rick and Morty ${ep.name}`}
				/>
				<div>{ep.name}</div>
				<section
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div>
						Season: {ep.season} Episode: {ep.number}
					</div>
					<button type='button' onClick={() => toggleFavAction(ep)}>
						{favorites.find((fav: IEpisode) => fav.id === ep.id)
							? 'Unfav'
							: 'Fav'}
					</button>
				</section>
			</section>
		);
	});
}
