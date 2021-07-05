import * as React from 'react';

export type Properties<T> = Array<keyof T>;
export type Props<T> = {
	allowFields: Properties<T>,
	denyFields: Properties<T>,
	sourceData: T[]
};

const useSearch = <T>(props: Partial<Props<T>> = {}) => {
	const { allowFields = [], denyFields = [] } = props;
	const [searchValue, setSearchValue] = React.useState('');
	const [filtered, setFiltered] = React.useState<T[]>([]);
	const [sourceData, setSourceData] = React.useState<T[]>(props.sourceData || []);

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

	React.useEffect(() => { filter(); }, [searchValue, sourceData]);

	return {
		filtered, setSearchValue, setSourceData, sourceData,
	};
};

export default useSearch;
