import execa from 'execa'

interface UnzipOptions {
  zipPath: string,
  filesToExtract: string,
  outputDir: string,
}

const unzip = async (options: UnzipOptions) => {
  const { zipPath, filesToExtract, outputDir } = options
  const result = await execa('unzip', [
    '-j',
    zipPath,
    filesToExtract,
    '-d',
    outputDir,
  ])
  const files = result.stdout.match(/(?<=inflating:\s)[\S]+/g)
  return files
}

interface UnzipApkOptions {
  zipPath: string,
  outputDir: string,
}

const unzipApk = (options: UnzipApkOptions) => {
  const { zipPath, outputDir } = options
  return unzip({
    zipPath,
    filesToExtract: 'classes*.dex',
    outputDir,
  })
}

export default unzipApk
