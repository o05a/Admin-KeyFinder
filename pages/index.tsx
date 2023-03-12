import WithDrawer from '@components/Layouts/WithDrawer'
import Meta from '@components/Layouts/Meta'
import { Box } from '@mui/material'
import WithMotion from '@components/Layouts/WithMotion'
import WithAppBar from '@components/Layouts/WithAppBar'
import { GetServerSideProps } from 'next'
import withServerSideBaseProps, { ServerSideBaseProps } from '@helpers/withServerSideBaseProps'
import { NextPageWithProps } from '@interfaces/NextPage'

const Page: NextPageWithProps = () => (
	<WithMotion>
		<Meta title="Dashboard" />
		<Box m="auto" display="grid" gap={2}>
			Dashboard page
		</Box>
	</WithMotion>
)

Page.getLayout = page => (
	<WithAppBar>
		<WithDrawer>{page}</WithDrawer>
	</WithAppBar>
)
export const getServerSideProps: GetServerSideProps = withServerSideBaseProps(
	async ({ props }: ServerSideBaseProps) => ({
		props: {
			...props,
		},
	})
)

export default Page
