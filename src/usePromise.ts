import * as React from 'react';

export type UsePromise<T> = {
    promise: Promise<T>,
	onSuccess?: (data?: T) => void,
	onFail?: (err?: any) => void,
	onComplete?: (data?: T, err?: any) => void,
}

export type State<T> = {
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    data: T | null,
    error: any,
    status: 'idle' | 'pending' | 'resolved' | 'rejected',
};

const initialState: Readonly<State<null>> = {
    isSuccess: false,
    isLoading: false,
    isError: false,
    data: null,
    error: null,
    status: 'idle',
}

type Action = { type: 'FETCH_INIT' } 
    | { type: 'FETCH_SUCCESS', payload: any }
    | { type: 'FETCH_FAILURE', payload: any };

type Reducer<T> = (state: State<T>, action: Action) => State<T>;
const reducer = <T>(state: State<T>, action: Action): State<T> => {
	switch (action.type) {
	case 'FETCH_INIT':
		return {
			...state,
			status: 'pending',
			isSuccess: false,
			isLoading: true,
			isError: false,
			error: null,
			data: null,
		};
	case 'FETCH_SUCCESS':
		return {
			...state,
			status: 'resolved',
			isSuccess: true,
			isLoading: false,
			isError: false,
			data: action.payload,
		};
	case 'FETCH_FAILURE':
		return {
			...state,
			status: 'rejected',
			isSuccess: false,
			isLoading: false,
			isError: true,
			error: action.payload,
		};
	default:
		throw new Error();
	}
};


export default <T = any >(props: UsePromise<T>) => {
    const {
        promise,
        onSuccess = ()=>{},
        onComplete = ()=>{},
        onFail = ()=>{},
    } = props || {};

    const [state, dispatch] = React.useReducer<Reducer<T>>(reducer, initialState);

    const handlePromise = async () => {
        try {
            if(state.isLoading) return;
            
            dispatch({type: 'FETCH_INIT'});
            const data = await promise;
            
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
            onSuccess(data);
            onComplete(data, null);
        } catch (error) {
            dispatch({ type:  'FETCH_FAILURE', payload: error })
            onFail(error);
            onComplete(undefined, error);
        }
    }

    return [state, handlePromise] as const;
}