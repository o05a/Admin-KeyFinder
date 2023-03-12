import global from './global'
import drawer from './drawer'
import errors from './errors'
import login from './pages/login'
import dashboard from './pages/dashboard'

export default {
	global,
	drawer,
	pages: {
		login,
		dashboard,
	},
	errors,
}
