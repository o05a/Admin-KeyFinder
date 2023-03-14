import { ReactComponent as Edit } from '@svg/Users/edit.svg'
import { ILabels } from '@labels'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import pages from '@constants/pages'
import { Button } from '@admixltd/admix-component-library'
import { ColumnDefinition, TableActionMenu } from '@admixltd/admix-component-library/Table'
import { useRouter } from 'next/router'
import StyledMenu from '@components/Main/StyledMenu/StyledMenu'
import { User } from '@api/Models/users/types'

const EditButton: FC<PropsWithChildren<{ id: User['id']; closeMenu: () => void }>> = ({
	id,
	children,
	closeMenu,
}) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	useEffect(() => {
		router.events.on('routeChangeComplete', closeMenu)
		return () => {
			router.events.off('routeChangeComplete', closeMenu)
		}
	}, [])

	return (
		<Button
			disabled={false}
			shineLoading={loading}
			color="text"
			icon={<Edit />}
			onClick={() => {
				if (loading) return
				setLoading(true)
				router.push(`${pages.users.url}/${id}`)
			}}
		>
			{children}
		</Button>
	)
}

export default (labels: ILabels[keyof ILabels]['pages']['users']['columns']) =>
	({
		align: 'right',
		type: 'actions',
		field: 'action',
		renderCell: ({ row: { id } }) => (
			<TableActionMenu id={id}>
				{({ close: closeMenu }) => (
					<StyledMenu>
						<div className="titleContainer">{labels.actions.menuTitle}</div>
						<div className="menuGroup">
							<EditButton id={id} closeMenu={closeMenu}>
								{labels.actions.menuTitle}
							</EditButton>
						</div>
					</StyledMenu>
				)}
			</TableActionMenu>
		),
	} as ColumnDefinition)
