import { db, pg } from '@/infra/database'
import { schema } from '@/infra/database/schemas'
import { makeRight } from '@/shared/either'
import { uploadFileToStorage } from '@/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

export async function exportLinks() {
  const { sql, params } = db
    .select({
      originalUrl: schema.links.originalUrl,
      shortenedUrl: schema.links.shortenedUrl,
      createdAt: schema.links.createdAt,
      accessCount: schema.links.accessCount,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      {
        key: 'original_url',
        header: 'Original URL',
      },
      {
        key: 'shortened_url',
        header: 'Short URL',
      },
      {
        key: 'created_at',
        header: 'Uploaded At',
      },
      {
        key: 'access_count',
        header: 'Access Count',
      },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCsvPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  })

  const [, { url }] = await Promise.all([convertToCsvPipeline, uploadToStorage])

  return makeRight({ reportUrl: url })
}
