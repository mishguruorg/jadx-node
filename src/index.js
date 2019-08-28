// @flow
import { spawn } from 'child_process'
import path from 'path'

const jadxPath = path.resolve(path.join(__dirname, '../bin/jadx/bin/jadx/'))

const runJadx = async (source: string, destinationDirectory: string) => {
  console.log('Jadx Path: ', jadxPath)
  const jadx = spawn(
    jadxPath,
    ['-r', '--show-bad-code', '-j', '6', '-d', destinationDirectory, source],
    {
      env: {
        ...process.env,
        JAVA_OPTS: '-Xmx2G'
      }
    }
  )

  jadx.stdout.on('data', (data) => {
    console.log('Jadx: ', data.toString())
  })

  jadx.stderr.on('data', (data) => {
    console.log('Jadx Error: ', data.toString())
  })

  return new Promise((resolve, reject) => {
    jadx.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Closed with exit code ${code}`))
      }
    })
  })
}

export default runJadx
