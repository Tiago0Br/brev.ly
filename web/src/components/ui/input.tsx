import { WarningIcon } from '@phosphor-icons/react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
}

export function Input({ errorMessage, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        {...props}
        className="border border-gray-300 rounded-md p-2 placeholder:text-sm focus:outline-blue-base peer order-1"
      />

      <label
        htmlFor="originalLink"
        className="text-xs uppercase text-gray-500 peer-focus:text-blue-base peer-focus:font-bold"
      >
        Link original
      </label>

      {errorMessage && (
        <div className="flex items-center gap-1 order-2">
          <WarningIcon size={14} className="text-red-500" />
          <p className="text-xs">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}
