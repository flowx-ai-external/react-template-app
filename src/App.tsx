import { useState, useEffect } from 'react'
import { AuthProvider, AuthProviderProps } from 'oidc-react'

import { environment } from './environment'

import Process from './process'

type OrgLookupResponse = {
  organizationId: string
  issuer: string
  tokenEndpoint: string
  clientId: string
  redirectUri: string
}

const ORG_CODE = environment.orgCode
const FX_CLIENT_HOST = 'Fx-Client-Host'
const REDIRECT_LOCAL_STORAGE_KEY = 'FX-REDIRECT'

const fetchOrgLookup = async (
  url: string,
  clientHostHeaderValue: string
): Promise<OrgLookupResponse> => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      [FX_CLIENT_HOST]: clientHostHeaderValue,
    },
  })

  if (!response.ok) {
    throw new Error(`Org lookup failed (${response.status})`)
  }

  return (await response.json()) as OrgLookupResponse
}

function App() {
  const [oidcConfig, setOidcConfig] = useState<AuthProviderProps | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeOidcConfig = async () => {
      try {
        const url = `${environment.baseUrl}/org/api/org/code/${encodeURIComponent(ORG_CODE)}`
        const response = await fetchOrgLookup(url, window.location.host)

        const redirectUrl = localStorage.getItem(REDIRECT_LOCAL_STORAGE_KEY)

        const config: AuthProviderProps = {
          authority: response.issuer,
          clientId: response.clientId,
          redirectUri: redirectUrl ?? response.redirectUri,
          responseType: environment.keycloak.responseType,
          scope: environment.keycloak.scope,
          automaticSilentRenew: true,
          onSignIn: () => {
            if (redirectUrl) {
              localStorage.removeItem(REDIRECT_LOCAL_STORAGE_KEY)
              if (redirectUrl !== window.location.href) {
                window.location.href = redirectUrl;
              } else {
                history.replaceState({}, document.title, window.location.pathname)
              }
            }
          },
        }

        setOidcConfig(config)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
        setLoading(false)
      }
    }

    initializeOidcConfig()
  }, [])

  if (loading) {
    return <div>Loading authentication...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (oidcConfig) {
    return (
      <AuthProvider {...oidcConfig}>
        <Process />
      </AuthProvider>
    )
  }

  return null
}

export default App
