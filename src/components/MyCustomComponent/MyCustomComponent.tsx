import { useCallback, useEffect, useRef } from 'react'
import { ANALYTICS_EVENTS, pushAnalyticsData } from '@flowx/core-sdk'
import { getMediaItemUrl, getSubstitutionTagContent, useEnumerationItems } from '@flowx/react-sdk'
import type { FlxCustomComponentProps } from '@flowx/react-sdk/hooks'
import { FlxButton } from '@flowx/react-ui-toolkit'

export const MyCustomComponent = ({ input, validate, saveData, isSubmitted }: FlxCustomComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Utility API: resolved against the project of the running renderer
  const options = useEnumerationItems('<ENUMERATION_NAME>')
  const logoUrl = getMediaItemUrl('<MEDIA_ITEM_KEY>')
  const label = getSubstitutionTagContent('<SUBSTITUTION_TAG_KEY>') ?? 'Client name'

  useEffect(() => {
    // Called on step submit: block it while the name is empty
    validate(() => !!inputRef.current?.value)
    // Called on step submit: the result is written back to the process data
    saveData(() => ({ name: inputRef.current?.value }))
  }, [validate, saveData])

  const save = useCallback(() => {
    pushAnalyticsData({ type: ANALYTICS_EVENTS.ACTION, value: 'custom-component-save', label: 'Save Data' })
    input.runAction('saveData', { appData: { name: inputRef.current?.value } })
  }, [input])

  return input ? (
    <div style={{ border: '1px solid black', borderRadius: '1rem', padding: '1rem' }}>
      {logoUrl && <img src={logoUrl} alt="logo" height={32} />}
      <h1>Custom component</h1>
      <p>Received Data:</p>
      <p>{JSON.stringify(input.data)}</p>

      <label style={{ marginRight: '0.5rem' }}>{label}</label>
      <input ref={inputRef} type="text" style={{ marginRight: '0.5rem' }} />
      {isSubmitted && !inputRef.current?.value && <span style={{ color: 'red' }}>Required</span>}

      <select style={{ marginLeft: '0.5rem' }}>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <FlxButton onClick={() => save()} style={{ marginTop: '20px' }}>
        {' '}
        Save Data
      </FlxButton>
    </div>
  ) : null
}
