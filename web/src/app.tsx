import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { createLink } from './http/create-link'
import { getLinks } from './http/get-links'
import { queryClient } from './lib/query-client'

export function App() {
  const [originalLink, setOriginalLink] = useState('')
  const [shortenedLink, setShortenedLink] = useState('')

  const { data: links } = useQuery({
    queryKey: ['links'],
    queryFn: getLinks,
  })

  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    await createLinkFn({
      originalUrl: originalLink,
      shortenedUrl: shortenedLink,
    })

    setOriginalLink('')
    setShortenedLink('')
  }

  return (
    <main className="mt-20 flex justify-center items-baseline gap-6">
      <form
        className="w-[380px] h-[340px] bg-gray-100 rounded-lg p-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl text-gray-600 font-bold">Novo link</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="originalLink" className="text-xs uppercase text-gray-500">
              Link original
            </label>
            <input
              type="text"
              id="originalLink"
              placeholder="www.exemplo.com.br"
              className="border border-gray-300 rounded-md p-2 placeholder:text-sm"
              value={originalLink}
              onChange={(e) => setOriginalLink(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="shortLink" className="text-xs uppercase text-gray-500">
              Link encurtado
            </label>
            <input
              type="text"
              id="shortLink"
              placeholder="brev.ly/"
              className="border border-gray-300 rounded-md p-2 placeholder:text-sm"
              value={shortenedLink}
              onChange={(e) => setShortenedLink(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-base text-white rounded-md p-2 cursor-pointer hover:bg-blue-dark transition-colors"
        >
          Salvar link
        </button>
      </form>

      <div className="w-[580px] min-h-[234px] bg-gray-100 rounded-lg p-8 flex flex-col gap-6">
        <h2 className="text-xl text-gray-600 font-bold">Meus links</h2>

        <div className="mt-5 py-4 border-t border-gray-400">
          {links?.length === 0 ? (
            <p className="text-center uppercase text-xs">
              Ainda não existem links cadastrados
            </p>
          ) : (
            links?.map((link) => (
              <div key={link.id} className="py-2 border-b border-gray-400">
                <p className="text-sm text-gray-600">{link.originalUrl}</p>
                <p className="text-sm text-gray-600">{link.shortenedUrl}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
