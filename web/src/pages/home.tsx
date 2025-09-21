import logo from '@/assets/logo.svg'
import { Input } from '@/components/ui/input'
import { createLink } from '@/http/create-link'
import { deleteLink } from '@/http/delete-link'
import { exportLinks } from '@/http/export-links'
import { getLinks } from '@/http/get-links'
import { queryClient } from '@/lib/query-client'
import { validateUrlPath } from '@/utils/validate-url-path'
import { zodResolver } from '@hookform/resolvers/zod'
import { CopyIcon, DownloadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const createLinkForm = z.object({
  originalUrl: z.url({ error: 'Informe uma url válida' }),
  shortenedUrl: z.string().refine(validateUrlPath, {
    error: 'Informe uma url, sem espaços ou caracteres especiais',
  }),
})

type CreateLinkForm = z.infer<typeof createLinkForm>

export function HomePage() {
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
    onError: (error) => {
      if (isAxiosError(error)) {
        if (error.response?.data.message === 'This shortened URL already exists') {
          return toast.error('O link encurtado já existe.')
        }
        toast.error('Ocorreu um erro ao criar o link. Tente novamente.')
      }
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

    toast.success('Link criado com sucesso!')

    reset()
  }

  async function handleDeleteLink(id: string) {
    await deleteLinkFn(id)
    toast.success('Link deletado com sucesso!')
  }

  async function handleCopyLink(text: string) {
    await navigator.clipboard.writeText(text)
    toast.success('Link copiado para a área de transferência!')
  }

  async function handleExportLinks() {
    const { reportUrl } = await exportLinksFn()
    window.open(reportUrl, '_blank')
    toast.success('Relatório gerado com sucesso!')
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
            <Input
              type="text"
              id="originalLink"
              placeholder="www.exemplo.com.br"
              {...register('originalUrl')}
              disabled={isSubmitting}
              errorMessage={errors.originalUrl?.message}
            />

            <Input
              type="text"
              id="shortLink"
              placeholder="brev.ly/"
              {...register('shortenedUrl')}
              disabled={isSubmitting}
              errorMessage={errors.shortenedUrl?.message}
            />
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
                    <a
                      href={`${window.location.origin}/${link.shortenedUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-base font-bold"
                    >
                      {window.location.host}/{link.shortenedUrl}
                    </a>
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
