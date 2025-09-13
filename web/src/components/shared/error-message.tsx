import { WarningIcon } from '@phosphor-icons/react'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-1">
      <WarningIcon size={14} className="text-red-500" />
      <p className="text-xs">{message}</p>
    </div>
  )
}
