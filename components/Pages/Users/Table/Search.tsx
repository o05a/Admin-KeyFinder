import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import SearchComponentCreator from '@components/Helpers/Table/SearchComponentCreator'
import { SearchAtom, SearchCookieName } from '@atoms/Users/Table'

const Search = () => {
	const { search } = useRecoilValue(LabelsAtom).pages.users.fields
	return (
		<SearchComponentCreator
			{...{
				SearchAtom,
				cookieName: SearchCookieName,
				labels: search,
				popupId: 'UserSearchBar',
			}}
		/>
	)
}

export default Search
