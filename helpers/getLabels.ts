import { getRecoil } from '@admixltd/admix-component-library/RecoilNexus'
import LabelsAtom from '@atoms/Labels'
import labels from '@labels'
import { getRouter } from '@helpers/RouterNexus'
import requestContext from '@helpers/requestContext'

const getLabels = () => {
	const locale = getRouter()?.locale ?? requestContext.get().locale ?? 'en'
	return getRecoil(LabelsAtom) ?? labels[locale as keyof typeof labels]
}
export default getLabels
