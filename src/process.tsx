import { useAuth } from 'oidc-react'
import { useEffect, useCallback, useMemo } from 'react'

import { AnalyticsData, HttpRequestInterceptor, HttpResponseInterceptor } from '@flowx/core-sdk'
import { FlxProcessRenderer } from '@flowx/react-sdk'

import { environment } from './environment'

import { MyCustomComponent } from './components/MyCustomComponent/MyCustomComponent'

import { useLanguage } from './hooks/useLanguage'

const { baseUrl, assetsBaseUrl, enginePath } = environment

const processName = '<PROCESS_NAME>'
const projectId = {projectId: '<PROJECT_ID>'}
const themeId = '<THEME_ID>'
const workspaceId = '<WORKSPACE_ID>'
const organizationId = '<ORG_ID>'
const processStartData = {}

// Keys must match the custom validator names defined in the process
const validators = {
  customValidator: (...params: string[]) => (v: string) => v === params[0],
}

export default function ProcessComponent() {
  const auth = useAuth()
  const { getSelectedLanguage } = useLanguage()

  const customLoaderProvider = useMemo(() => {
    return {
      startProcess: <div>Starting the process...</div>,
      reloadProcess: <div>Loading...</div>,
      defaultAction: <div>Running action...</div>,
      defaultUpload: <div>Uploading...</div>,
      actions:{
        action1: <div>Loading action1...</div>,
        action2: <div>Loading action2...</div>,
      }
    }
  }, [])

  const requestInterceptors = useMemo<HttpRequestInterceptor[]>(() => [
    {
      onFulfilled: (config) => {
        config.headers.set('X-Custom-Header', 'react-template-app')
        return config
      },
    },
  ], [])

  const responseInterceptors = useMemo<HttpResponseInterceptor[]>(() => [
    {
      onRejected: (error) => {
        console.error('FlowX request failed:', error)
        return Promise.reject(error)
      },
    },
  ], [])

  const handleProcessEnded = useCallback(() => {
    console.log('Process has ended')
  }, [])

  const handleProcessStarted = useCallback((processInstanceUuid: string) => {
    console.log('Process has started with processInstanceUuid: ', processInstanceUuid)
  }, [])

  const analyticsListener = useCallback((event: Event) => {
    const { detail } = event as CustomEvent<AnalyticsData>
    console.log('Received flowx:analytics event:', detail);
  }, [])

  useEffect(() => {
    document.addEventListener('flowx:analytics', analyticsListener)

    return () => {
      document.removeEventListener('flowx:analytics', analyticsListener)
    }
  }, [analyticsListener])

  return (
    auth.userData?.access_token && (
      <FlxProcessRenderer
        baseUrl={baseUrl}
        language={getSelectedLanguage().value}
        accessToken={auth.userData?.access_token}
        processName={processName}
        processStartData={processStartData}
        workspaceId={workspaceId}
        organizationId={organizationId}
        enginePath={enginePath}
        themeId={themeId}
        isDraft={false}
        components={{ MyCustomComponentIdentifier: MyCustomComponent }}
        validators={validators}
        assetsBaseUrl={assetsBaseUrl}
        locale="en-US"
        projectInfo={projectId}
        onProcessEnded={handleProcessEnded}
        onProcessStarted={handleProcessStarted}
        customLoaderProvider={customLoaderProvider}
        requestInterceptors={requestInterceptors}
        responseInterceptors={responseInterceptors}
        cache={false}
      />
    )
  )
}
