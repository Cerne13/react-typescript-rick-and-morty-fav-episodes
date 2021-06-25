import React, { useContext } from 'react';
import { Store } from './Store';
import { Link } from '@reach/router';

const App = (props: any): JSX.Element => {
	const { state } = useContext(Store);

	return (
		<>
			<header className='header'>
				<div>
					<h1>Rick and Morty</h1>
					<p>Pick your favourite episode!</p>
				</div>
				<div className='header-links'>
					<Link to='/' className='link'>
						Home
					</Link>
					<Link to='/faves' className='link'>
						Favorites: {state.favorites.length}
					</Link>
				</div>
			</header>
			{props.children}
		</>
	);
};

export default App;
