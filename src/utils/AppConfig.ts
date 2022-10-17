import { token } from '../constants'

export const AppConfig = {
  siteName: 'Ticket Gateway',
  locale: 'en',
  title: 'Description',
  description:
    'Proactive For Her Blogs | Specialist written blogs on all facets of health that simplify medical knowledge. Proactive For Her is a Women\'s Digital Health Clinic.',
  tokenKey: 'token',
  paths: {
    // BASE: process.env.REACT_APP_BASE_URL!,
    // WEBSITE_URL: process.env.REACT_APP_BASE_URL!,
  },
}

export const isAuthenticated = () => {
  const authToken = window.localStorage.getItem(token)
  if (!authToken) {
    return false
  }
  return true
}
