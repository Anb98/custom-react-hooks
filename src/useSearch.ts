import * as React from 'react';

export type Properties<T> = Array<keyof T>;
export type Props<T> = {
	allowFields: Properties<T>,
	denyFields: Properties<T>,
	sourceData: T[]
};

/**
 * This hook filters results when searching.
 * @param props Initial options
 * @example
 * ```
const { setSourceData, setSearchValue, filtered, sourceData }
= useSearch({ allowFields: [], denyFields: [] sourceData: [] });
 * ```
 * @see https://www.npmjs.com/package/@anb98/react-hooks#useSearch
 */
const useSearch = <T>(props: Partial<Props<T>> = {}) => {
	const { allowFields = [], denyFields = [] } = props;
	const [searchValue, setSearchValue] = React.useState('');
	const [filtered, setFiltered] = React.useState<T[]>([]);
	const [sourceData, setSourceData] = React.useState<T[]>([]);

	const filter = () => {
		const searchValues = searchValue.toLowerCase().trim().split(' ');

		const filteredData = sourceData.filter((item) => {
			// eslint-disable-next-line no-restricted-syntax
			for (const prop in item) {
				if (Object.prototype.hasOwnProperty.call(item, prop)) {
					if (
						denyFields.includes(prop)
						|| (allowFields.length && !allowFields.includes(prop))
					) {
						// eslint-disable-next-line no-continue
						continue;
					}

					const value = String(item[prop]).toLocaleLowerCase();
					const coincidences = searchValues.reduce(
						(acc, search) => (value.includes(search) ? acc + 1 : acc),
						0,
					);

					if (coincidences >= searchValues.length) return true;
				}
			}
			return false;
		});

		setFiltered(filteredData);
	};

	React.useEffect(() => { setSourceData(props.sourceData || []); }, [props.sourceData]);

	React.useEffect(() => { filter(); }, [searchValue, sourceData]);

	return {
		filtered, setSearchValue, setSourceData, sourceData,
	};
};

export default useSearch;
