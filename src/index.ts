import execa from 'execa'
import path from 'path'

const JADX_PATH = path.join(__dirname, '../resources/jadx-1.0.0/bin/jadx')

const jadx = async (sourceDexPath: string, destinationDirectory: string) => {
  await execa(
    JADX_PATH,
    [
      '--no-res', // do not decode resources
      '--show-bad-code',
      '--threads-count', '6',
      '--output-dir', destinationDirectory,
      sourceDexPath,
    ],
    {
      extendEnv: true,
      env: {
        JAVA_OPTS: '-Xmx2G',
      },
      stdout: 'inherit',
      stderr: 'inherit',
    },
  )
}

export default jadx
