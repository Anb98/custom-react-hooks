import { useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
	case 'FETCH_INIT':
		return {
			...state,
			status: 0,
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
			data: null,
		};
	case 'FETCH_SUCCESS':
		return {
			...state,
			status: action.payload.status,
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload.data,
		};
	case 'FETCH_FAILURE':
		return {
			...state,
			status: action.payload.status,
			isSuccess: false,
			isLoading: false,
			isError: true,
			error: action.payload.data,
		};
	default:
		throw new Error();
	}
};

/**
 * Callback called when request succeeds
 * @callback onSuccess
 * @param {any} data - Result from request
 */

/**
 * Callback called when request fails
 * @callback onFail
 * @param {any} error - Error from request
 */

/**
 * Callback called when request completes
 * @callback onComplete
 * @param {any} data - Result from request
 * @param {any} error - Error from request
 */

/**
 * Request state
 * @typedef {Object} state
 * @prop {boolean} isLoading - Loading
 * @prop {boolean} isError - Request has failed
 * @prop {boolean} isSuccess - Request has succeed
 * @prop {boolean} status - State from request
 * @prop {any} data - Result from request
 * @prop {any} error - Error from request
 */

/**
 * Initial settings
 * @typedef {Object} initialSettings
 * @prop {string} [url] - Initial URL to request
 * @prop {object} [headers] - Header request
 * @prop {onSuccess} [onSuccess] - Callback called when request succeeds
 * @prop {onFail} [onFail] - Callback called when request fails
 * @prop {onComplete} [onComplete] - Callback called when request completes
 */

/**
 * useDataApi
 * @param {initialSettings} [initialSettings] - Initial settings
 * @returns {state | fetchData}
 */
const useDataApi = ({
	url: originalUrl=null,
	headers = {},
	onSuccess = ()=>{},
	onFail = ()=>{},
	onComplete = ()=>{},
} = {}) => {
	const [state, dispatch] = useReducer(reducer, {
		isSuccess: false,
		isLoading: false,
		isError: false,
		data: null,
		error: null,
	});

	const requestApi = async (request) => {
		try {
			dispatch({ type: 'FETCH_INIT' });
			const result = await axios(request);
			const { data, status } = result;

			dispatch({ type: 'FETCH_SUCCESS', payload: { data, status } });

			onSuccess(data);
			onComplete(data, null);
		} catch (error) {
			dispatch({ type: 'FETCH_FAILURE', payload: { data: error, status: error.response?.status } });
			onFail(error);
			onComplete(null, error);
		}
	};

	/**
	 * Params
	 * @typedef {Object} fetchDataParams
	 * @prop {any} [body] - Body request
	 * @prop {string} [method=get] - HTTP method
	 * @prop {any} [params] - Params request
	 * @prop {string} [url] - URL to request
	 * @prop {boolean} [withCredentials=false]
	 */

	/**
	 * fetchData
	 * @param {fetchDataParams}
	 */
	const fetchData = async ({
		body = null,
		method = 'get',
		params,
		url = originalUrl,
		withCredentials = false
	} = {}) => {
		if (state.isLoading) return; // Request in process

		const request = {
			method,
			url,
			headers: { ...axios.defaults.headers.common, ...headers },
			data: body,
			params,
			withCredentials,
		};

        requestApi(request);
	};

	return [state, fetchData];
};

export default useDataApi;
