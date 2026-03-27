import { useState } from 'react'
import { type DocumentActionComponent, useDocumentOperation } from 'sanity'

export const ConfirmPublishAction: DocumentActionComponent = (props) => {
  const { publish } = useDocumentOperation(props.id, props.type)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  if (!props.draft) {
    return null
  }

  return {
    label: isPublishing ? 'Publication…' : isConfirming ? 'Confirmer ?' : 'Publier',
    tone: isConfirming ? 'positive' as const : undefined,
    disabled: !!publish.disabled || isPublishing,
    onHandle: () => {
      if (!isConfirming) {
        setIsConfirming(true)
        setTimeout(() => setIsConfirming(false), 3000)
        return
      }

      setIsPublishing(true)
      publish.execute()

      setTimeout(() => {
        setIsPublishing(false)
        setIsConfirming(false)
        props.onComplete()
      }, 1500)
    },
  }
}
