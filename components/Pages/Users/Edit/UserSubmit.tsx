import { useRecoilState, useRecoilValue } from 'recoil'
import LabelsAtom from '@atoms/Labels'
import { Button, useFirstRender } from '@admixltd/admix-component-library'
import { FormFieldDataUpdater, FormFieldErrorsDataUpdater } from '@forms'
import { useEffect, useMemo } from 'react'
import UserFormUpdatedAtom from '@atoms/Users/Edit/UserFormUpdated'
import UserFormLoadingAtom from '@atoms/Users/Edit/UserFormLoadingAtom'

const UserSubmit = () => {
	const firstRender = useFirstRender()
	const [formUpdated, setFormUpdated] = useRecoilState(UserFormUpdatedAtom)
	const errors = useRecoilValue(FormFieldErrorsDataUpdater)
	const loading = useRecoilValue(UserFormLoadingAtom)
	const { save } = useRecoilValue(LabelsAtom).pages.users.edit.actions

	const formData = useRecoilValue(FormFieldDataUpdater)

	useEffect(() => {
		if (firstRender) return
		if (formUpdated) return
		setFormUpdated(true)
	}, [JSON.stringify(formData)])

	const disabled = !formUpdated || loading || Object.values(errors).length !== 0

	return useMemo(
		() => (
			<Button
				round
				type="submit"
				size="large"
				variant="contained"
				loading={loading}
				disabled={disabled}
			>
				{save}
			</Button>
		),
		[loading, disabled, save]
	)
}

export default UserSubmit
