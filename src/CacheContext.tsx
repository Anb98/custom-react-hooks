import * as React from 'react';

type Context = {
	result: object
	setResult: (objectRequest: string, result: any) => void
};

export const CacheContext = React.createContext<Context>({ result: {}, setResult: () => {} });

type Props = {
    children: React.ReactNode
};

export default ({ children } : Props) => {
	const state = React.useRef({});

	const setResult = (objectRequest: string, result: any) => {
		state.current[objectRequest] = result;
	};

	return (
		<CacheContext.Provider value={{ result: state.current, setResult }}>
			{children}
		</CacheContext.Provider>
	);
};
