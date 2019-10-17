import jadx from './jadx'
import unzipApk from './unzip-apk'
import * as tempy from 'tempy'
import fs from 'fs'
import ora from 'ora'
import { DateTime } from 'luxon'
import c from 'chalk'

const decompile = async (rawSourcePath: string, outputDir: string) => {
  const spinner = ora()

  const sourcePath = rawSourcePath.trim()

  if (sourcePath.endsWith('.dex')) {
    const logPath = tempy.file()
    return jadx({
      sourcePath,
      outputDir,
      logPath,
    })
  }

  if (sourcePath.endsWith('.apk')) {
    spinner.start('Unzipping APK into temporary directory')
    const tempDir = tempy.directory()
    const dexFiles = await unzipApk({
      zipPath: sourcePath,
      outputDir: tempDir,
    })
    spinner.succeed()

    try {
      const count = dexFiles.length
      for (let i = 0; i < count; i += 1) {
        const dexFile = dexFiles[i]

        const startTime = DateTime.local()
        spinner.start()

        const interval = setInterval(() => {
          const diff = DateTime.local().diff(startTime)
          const timeSince = diff.toFormat(`s's'`)
          spinner.text = `Decompiling DEX file ${i + 1} of ${count} ${c.gray(
            `(${timeSince})`,
          )}`
        }, 200)

        try {
          await jadx({
            sourcePath: dexFile,
            outputDir,
          })
        } catch (error) {
          if (/ERROR - finished with errors$/.test(error.all) === false) {
            console.error(
              error.all
                .split('\n')
                .slice(-10)
                .join('\n'),
            )
            throw error
          }
        }
        spinner.succeed()
        clearInterval(interval)
      }
    } finally {
      spinner.start('Cleaning up temporary files')
      await Promise.all(dexFiles.map((dexFile) => fs.promises.unlink(dexFile)))
      spinner.succeed()
    }
  }
}

export default decompile
