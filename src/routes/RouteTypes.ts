import { URL } from '../constants'
import { Home, Login } from '../pages'

export const publicRoutes = [{ path: URL.Login, Component: Login }]
export const privateRoutes = [{ path: URL.Home, Component: Home }]
