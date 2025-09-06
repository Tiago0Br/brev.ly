import notFoundLogo from '@/assets/404.svg'
import logo from '@/assets/logo-icon.svg'
import { getOriginalUrl } from '@/http/get-original-url'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function RedirectPage() {
  const { shortenedUrl } = useParams()

  if (!shortenedUrl) {
    return null
  }

  const { data, isLoading } = useQuery({
    queryKey: ['get-original-url', shortenedUrl],
    queryFn: () => getOriginalUrl({ shortenedUrl }),
  })

  useEffect(() => {
    if (data?.originalUrl) {
      window.location.href = data.originalUrl
    }
  }, [data])

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-gray-100 px-12 py-16 flex flex-col items-center gap-6 rounded-lg max-w-[580px]">
        {!isLoading && !data ? (
          <>
            <div className="h-20">
              <img
                src={notFoundLogo}
                alt="Logo do Brev.ly"
                className="h-full w-full"
                draggable={false}
              />
            </div>

            <h1 className="font-bold text-xl">Link não encontrado</h1>

            <p className="text-center text-sm text-gray-500">
              O link que você tentou acessar não existe,foi removido ou é uma URL
              inválida. Saiba mais em <a href="/">Brev.ly</a>
            </p>
          </>
        ) : (
          <>
            <div className="h-10">
              <img
                src={logo}
                alt="Logo do Brev.ly"
                className="h-full w-full"
                draggable={false}
              />
            </div>

            <h1 className="font-bold text-xl">Redirecionando...</h1>

            <p className="text-center text-sm text-gray-500">
              O link será aberto automaticamente em alguns instantes. <br />
              {data && (
                <>
                  Não foi redirecionado?{' '}
                  <a
                    href={data.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Clique aqui
                  </a>
                  .
                </>
              )}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
