import execa from 'execa'
import path from 'path'
import { dirname, basename } from 'path'

const JADX_PATH = path.join(__dirname, '../resources/jadx-1.1.0/bin/jadx')

interface JadxOptions {
  sourcePath: string
  outputDir: string
  logPath?: string
}

export type JadxFn = (options: JadxOptions) => Promise<void>

const jadx: JadxFn = async (options) => {
  const { sourcePath, outputDir } = options

  const subprocess = execa(
    JADX_PATH,
    [
      '--no-res', // do not decode resources
      '--show-bad-code',
      '--threads-count',
      '6',
      '--output-dir',
      outputDir,
      basename(sourcePath),
    ],
    {
      all: true,
      cwd: dirname(sourcePath),
      extendEnv: true,
      env: {
        JAVA_OPTS: '-Xmx2G',
      },
    },
  )
  process.on('SIGINT', async () => {
    await subprocess.kill()
    process.exit(1)
  })

  await subprocess
}

export default jadx
