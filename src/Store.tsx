import React, { createContext, useReducer } from 'react';

interface IState {
	episodes: [];
	favorites: [];
}

interface IAction {
	type: string;
	payload: any;
}

const initialState: IState = {
	episodes: [],
	favorites: [],
};

function reducer(state: IState, action: IAction): IState {
	switch (action.type) {
		case 'FETCH':
			return { ...state, episodes: action.payload };
		default:
			return state;
	}
}

export const Store = createContext<IState | any>(initialState);

export function StoreProvider(props: any): JSX.Element {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Store.Provider value={{ state, dispatch }}>
			{props.children}
		</Store.Provider>
	);
}
