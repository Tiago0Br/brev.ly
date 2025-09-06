import { zodResolver } from '@hookform/resolvers/zod'
import { CopyIcon, DownloadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import logo from './assets/logo.svg'
import { createLink } from './http/create-link'
import { deleteLink } from './http/delete-link'
import { exportLinks } from './http/export-links'
import { getLinks } from './http/get-links'
import { queryClient } from './lib/query-client'
import { validateUrlPath } from './utils/validate-url-path'

const createLinkForm = z.object({
  originalUrl: z.url({ error: 'URL inválida' }),
  shortenedUrl: z.string().refine(validateUrlPath, {
    error: 'URL inválida',
  }),
})

type CreateLinkForm = z.infer<typeof createLinkForm>

export function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateLinkForm>({
    resolver: zodResolver(createLinkForm),
    defaultValues: {
      originalUrl: '',
      shortenedUrl: '',
    },
  })

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

  const { mutateAsync: deleteLinkFn } = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })

  const { mutateAsync: exportLinksFn } = useMutation({
    mutationFn: exportLinks,
  })

  async function handleCreateLink({ originalUrl, shortenedUrl }: CreateLinkForm) {
    await createLinkFn({
      originalUrl,
      shortenedUrl,
    })

    reset()
  }

  async function handleDeleteLink(id: string) {
    await deleteLinkFn(id)
  }

  async function handleCopyLink(text: string) {
    await navigator.clipboard.writeText(text)
  }

  async function handleExportLinks() {
    const { reportUrl } = await exportLinksFn()
    window.open(reportUrl, '_blank')
  }

  return (
    <main className="mt-20">
      <div className="h-8">
        <img
          src={logo}
          alt="Logo do Brev.ly"
          className="h-full w-full"
          draggable={false}
        />
      </div>
      <div className="mt-6 flex justify-center items-baseline gap-6">
        <form
          className="w-[380px] min-h-[340px] bg-gray-100 rounded-lg p-8 flex flex-col gap-6"
          onSubmit={handleSubmit(handleCreateLink)}
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
                {...register('originalUrl')}
                disabled={isSubmitting}
              />

              {errors.originalUrl && (
                <p className="text-red-500 text-xs">{errors.originalUrl.message}</p>
              )}
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
                {...register('shortenedUrl')}
                disabled={isSubmitting}
              />

              {errors.shortenedUrl && (
                <p className="text-red-500 text-xs">{errors.shortenedUrl.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-base text-white rounded-md p-2 cursor-pointer hover:bg-blue-dark transition-colors"
            disabled={isSubmitting}
          >
            Salvar link
          </button>
        </form>

        <div className="w-[580px] min-h-[234px] bg-gray-100 rounded-lg p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-gray-600 font-bold">Meus links</h2>
            <button
              type="button"
              className="text-gray-600 bg-gray-200 p-2 rounded-md flex items-center gap-2 cursor-pointer"
              onClick={handleExportLinks}
            >
              <DownloadSimpleIcon size={20} />
              Baixar CSV
            </button>
          </div>

          <div className="mt-5 py-4 border-t border-gray-400">
            {links?.length === 0 ? (
              <p className="text-center uppercase text-xs">
                Ainda não existem links cadastrados
              </p>
            ) : (
              links?.map((link) => (
                <div
                  key={link.id}
                  className="flex justify-between items-center border-b border-gray-400"
                >
                  <div key={link.id} className="p-2">
                    <p className="text-sm text-blue-base font-bold">
                      {window.location.host}/{link.shortenedUrl}
                    </p>
                    <p className="text-sm text-gray-500">{link.originalUrl}</p>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="text-sm">{link.accessCount} acessos</span>

                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="size-8 rounded-md bg-gray-200 cursor-pointer flex justify-center items-center"
                        onClick={() =>
                          handleCopyLink(`${window.location.host}/${link.shortenedUrl}`)
                        }
                      >
                        <CopyIcon size={20} />
                      </button>
                      <button
                        type="button"
                        className="size-8 rounded-md bg-gray-200 cursor-pointer flex justify-center items-center"
                        onClick={() => handleDeleteLink(link.id)}
                      >
                        <TrashIcon size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
