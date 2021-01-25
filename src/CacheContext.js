import React, {
	createContext,
	useState,
} from 'react';

import PropTypes from 'prop-types';

export const CacheContext = createContext();

export const CacheProvider = ({ children }) => {
	const [state, setState] = useState({});

	const setResult = (objectRequest, result) => {
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

CacheProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
