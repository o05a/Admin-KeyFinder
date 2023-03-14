import { useRecoilState, useRecoilValue } from 'recoil'

import styled from '@emotion/styled'
import LabelsAtom from '@atoms/Labels'
import { Pagination } from '@admixltd/admix-component-library/Table'
import { LoadingAtom, PageIndexAtom, PageSizeAtom, TableDataAtom } from '@atoms/Users/Table'
import { useRouter } from 'next/router'

const TableFooter = () => {
	const [pageSize, setPageSize] = useRecoilState(PageSizeAtom)
	const [pageIndex, setPageIndex] = useRecoilState(PageIndexAtom)
	const tableData = useRecoilValue(TableDataAtom) ?? []
	const loading = useRecoilValue(LoadingAtom)
	const labels = useRecoilValue(LabelsAtom).pages.users.footer
	const locale = useRouter().locale ?? 'en'

	return (
		<FooterContainer locale={locale}>
			<div />
			<Pagination
				{...{
					loading,
					pageSize,
					rowCount: tableData.totalCount,
					page: pageIndex,
					labelRowsPerPage: labels.rowsPerPage,
					pageCounter: (from, to, total) => labels.pageCounter(from, to, total),
					onPageSizeChange: (size: number) => {
						if (loading) return
						setPageSize(size)
					},
					onPageChange: (page: number) => {
						if (loading) return
						setPageIndex(page)
					},
				}}
			/>
		</FooterContainer>
	)
}

const FooterContainer = styled.div<{
	locale: string
}>`
	height: 65px;

	display: flex;
	flex-shrink: 0;
	justify-content: space-between;
	border-top: 1px solid ${({ theme }) => theme.colors.gray300};
	align-items: center;

	.NavigationButtons {
		transform: ${({ locale }) => (locale === 'ar' ? 'scaleX(-1)' : 'scaleX(1)')};
		direction: ${({ locale }) => (locale === 'ar' ? 'rtl' : 'ltr')};
	}
`

export default TableFooter
