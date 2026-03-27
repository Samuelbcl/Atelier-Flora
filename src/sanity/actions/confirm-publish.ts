import { useState, useEffect } from 'react'
import { type DocumentActionComponent, useDocumentOperation } from 'sanity'

export const ConfirmPublishAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type)
  const [confirming, setConfirming] = useState(false)

  // Reset confirmation after 3 seconds
  useEffect(() => {
    if (confirming) {
      const timer = setTimeout(() => setConfirming(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [confirming])

  // Once published (draft disappears), reset state
  useEffect(() => {
    if (!props.draft) {
      setConfirming(false)
    }
  }, [props.draft])

  if (!props.draft) {
    return null
  }

  return {
    label: confirming ? '✓ Confirmer ?' : 'Publier',
    tone: confirming ? ('positive' as const) : undefined,
    disabled: !!publish.disabled,
    onHandle: () => {
      if (!confirming) {
        setConfirming(true)
        return
      }
      // Publish and let Sanity handle the state transition
      publish.execute()
      props.onComplete()
    },
  }
}

ConfirmPublishAction.action = 'publish'
