import * as React from 'react';

type Context = {
	state: object
	setResult: (objectRequest: string, result: any) => void
};

export const CacheContext = React.createContext<Context>({ state: {}, setResult: () => {} });

type Props = {
    children: React.ReactNode
};

export default ({ children } : Props) => {
	const [state, setState] = React.useState({});

	const setResult = (objectRequest: string, result: any) => {
		setState((prevState) => ({
			...prevState,
			[objectRequest]: result,
		}));
	};

	return (
		<CacheContext.Provider value={{ state, setResult }}>
			{children}
		</CacheContext.Provider>
	);
};
