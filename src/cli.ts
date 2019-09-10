import yargs from 'yargs'
import chalk from 'chalk'

import jadx from './index'

const argv = yargs
  .example('$0 -i classes.dex -o ./classes', 'Decompile a .dex file')
  .example('$0 -i firefox.apk -o ./firefox', 'Decompile an .apk file')
  .option('input', {
    alias: 'i',
    type: 'string',
    desc: 'Path to a file which will be decompiled',
    demand: true,
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    desc: 'Path to a directory to write decompiled files',
    demand: true,
  })
  .parse()

jadx(argv.input, argv.output).catch((error) => {
  console.error(chalk.red(error.message))
  process.exit(1)
})
