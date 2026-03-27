import { useState, useEffect } from 'react'
import { type DocumentActionComponent, useDocumentOperation } from 'sanity'

export const ConfirmPublishAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type)
  const [status, setStatus] = useState<'idle' | 'confirming' | 'publishing'>('idle')

  useEffect(() => {
    if (status === 'confirming') {
      const timer = setTimeout(() => setStatus('idle'), 3000)
      return () => clearTimeout(timer)
    }
  }, [status])

  if (!props.draft) {
    return null
  }

  return {
    label:
      status === 'publishing'
        ? 'Publication en cours…'
        : status === 'confirming'
          ? '✓ Confirmer la publication ?'
          : 'Publier',
    tone: status === 'confirming' ? ('positive' as const) : undefined,
    disabled: !!publish.disabled || status === 'publishing',
    onHandle: () => {
      if (status === 'idle') {
        setStatus('confirming')
        return
      }

      if (status === 'confirming') {
        setStatus('publishing')
        publish.execute()
        setTimeout(() => {
          setStatus('idle')
          props.onComplete()
        }, 1500)
      }
    },
  }
}

// Static property so Sanity can identify this action
ConfirmPublishAction.action = 'publish'
