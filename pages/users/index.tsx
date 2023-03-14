import WithDrawer from '@components/Layouts/WithDrawer'
import Meta from '@components/Layouts/Meta'
import WithMotion from '@components/Layouts/WithMotion'
import { useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import WithAppBar from '@components/Layouts/WithAppBar'
import styled from '@emotion/styled'
import { Button, flexGap } from '@admixltd/admix-component-library'
import { GetServerSideProps } from 'next'
import { ReactComponent as Plus } from '@svg/Users/plus.svg'
import { NextPageWithProps } from '@interfaces/NextPage'
import { getCookie } from 'cookies-next'
import withServerSideBaseProps, { ServerSideBaseProps } from '@helpers/withServerSideBaseProps'
import { FilteredResult } from '@api/Types/FilteredTable'
import WithHeader from '@components/Layouts/WithHeader'
import { User, UserFilter } from '@api/Models/users/types'
import TableController from '@components/Pages/Users/Table/TableController'
import Search from '@components/Pages/Users/Table/Search'
import ColumnSelector from '@components/Pages/Users/Table/ColumnSelector'
import Table from '@components/Pages/Users/Table/Table'
import TableFooter from '@components/Pages/Users/Table/TableFooter'
import UserService from '@api/Models/users'
import {
	ColumnSelectorCookieName,
	ColumnVisibilityAtom,
	PageIndexAtom,
	PageSizeAtom,
	SearchAtom,
	SearchCookieName,
	TableDataAtom,
} from '@atoms/Users/Table'
import { useRouter } from 'next/router'
import pages from '@constants/pages'
import { getRouter } from '@helpers/RouterNexus'

const Page: NextPageWithProps<{
	tableData: FilteredResult<User>
	defaultPageSize: number
	defaultPageIndex: number
	search?: string
	hiddenColumns?: string
}> = () => {
	const labels = useRecoilValue(LabelsAtom).pages.users
	const locale = useRouter().locale ?? 'en'
	return (
		<WithMotion>
			<Meta title={labels.title} />
			<WithHeader
				title={labels.title}
				rightSide={
					<Button
						round
						size="large"
						icon={<Plus />}
						variant="contained"
						onClick={() => {
							getRouter()?.push(`${pages.users.url}/create`)
						}}
					>
						{labels.createUser}
					</Button>
				}
			/>
			<TableController />
			<TableContainer locale={locale}>
				<TableActions>
					<div />
					<div>
						<Search />
						<ColumnSelector />
					</div>
				</TableActions>
				<Table />
				<TableFooter />
			</TableContainer>
		</WithMotion>
	)
}

const TableActions = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 66px;
	margin-right: -10px;
	margin-left: -10px;
	padding-left: 10px;

	${flexGap(8)};

	> div {
		${flexGap(16)};
	}
`
const TableContainer = styled.div<{
	locale: string
}>`
	border-radius: 8px;
	padding: 0 24px;
	background-color: ${({ theme }) => theme.colors.white};
	margin: 8px 0 24px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	width: 100%;
	.MuiDataGrid-root {
		width: 100%;
		direction: ${({ locale }) => (locale === 'ar' ? 'rtl' : 'ltr')};
	}
	.MuiDataGrid-columnHeadersInner {
		direction: ltr;
	}
	.MuiDataGrid-virtualScrollerContent {
		direction: ltr;
	}
`

Page.getLayout = page => (
	<WithAppBar>
		<WithDrawer>{page}</WithDrawer>
	</WithAppBar>
)

export const getServerSideProps: GetServerSideProps = withServerSideBaseProps(
	async ({ req, props }: ServerSideBaseProps) => {
		const defaultPageSize = 10
		const defaultPageIndex = 0
		const search = `${getCookie(SearchCookieName, { req }) ?? ''}`.trim()
		const hiddenColumns = `${getCookie(ColumnSelectorCookieName, { req }) ?? '[]'}`

		const request = await UserService.get()

		if ('redirect' in request) {
			const { redirect } = request
			return {
				redirect,
				props: {},
			}
		}

		if ('totalCount' in request) {
			const { totalCount, items } = request
			return {
				props: {
					...props,
					defaultPageSize,
					defaultPageIndex,
					search,
					hiddenColumns,
					tableData: { totalCount, items },
				},
			}
		}

		return {
			props: {
				...props,
			},
		}
	}
)

Page.recoilSetter = (
	{ set },
	{ defaultPageIndex, defaultPageSize, tableData, search = '', hiddenColumns = '[]' }
) => {
	set(TableDataAtom, tableData as FilteredResult<UserFilter>)
	set(PageSizeAtom, defaultPageSize as number)
	set(PageIndexAtom, defaultPageIndex as number)
	set(SearchAtom, search)
	set(ColumnVisibilityAtom, new Set(JSON.parse(hiddenColumns)))
}

export default Page
