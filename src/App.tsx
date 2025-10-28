import { AuthProvider, AuthProviderProps } from 'oidc-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { environment } from './environment'
import { environment as prodEnvironment } from './environment.prod'

import ProcessPage from './pages/process'
import HomePage from './pages/home'
import LandingPage from './pages/landing'
import DiscoverPage from './pages/discover'
import HistoryPage from './pages/history'
import KitchenSinkPage from './pages/kitchensink'

const { keycloak } = import.meta.env.DEV ? environment : prodEnvironment

const oidcConfig: AuthProviderProps = {
  onBeforeSignIn: () => {
    localStorage.setItem('redirect', window.location.href)
    return ''
  },
  onSignIn: () => {
    // remove auth query params
    history.replaceState({}, document.title, window.location.pathname)
    const redirect = localStorage.getItem('redirect')
    window.location.href = redirect || '/'
    localStorage.removeItem('redirect')
  },
  authority: keycloak.issuer,
  clientId: keycloak.clientId,
  redirectUri: keycloak.redirectUri,
  responseType: keycloak.responseType,
  scope: keycloak.scope,
  automaticSilentRenew: false,
}
function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/launcher" element={<LandingPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/kitchen-sink" element={<KitchenSinkPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
