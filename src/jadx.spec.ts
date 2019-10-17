import anyTest, { TestInterface } from 'ava'
import * as stu from 'stu'
import { SinonStub } from 'sinon'

import { JadxFn } from './jadx'

const test = anyTest as TestInterface<{
  execa: SinonStub,
  jadx: JadxFn,
}>

test.beforeEach((t) => {
  const execa = stu.mock('execa')
  const { default: jadx } = stu.test('./jadx')

  t.context = {
    execa,
    jadx,
  }
})

test('should pass correct argumens to execa', async (t) => {
  const { jadx, execa } = t.context

  const sourcePath = 'sourcePath'
  const outputDir = 'outputDir'

  await jadx({ sourcePath, outputDir })

  t.is(execa.callCount, 1)

  const [jadxPath, args, options] = execa.args[0]

  t.true(jadxPath.endsWith('/bin/jadx'))

  t.deepEqual(args, [
    '--no-res',
    '--show-bad-code',
    '--threads-count',
    '6',
    '--output-dir',
    outputDir,
    sourcePath,
  ])

  t.deepEqual(options, {
    all: true,
    cwd: '.',
    env: {
      JAVA_OPTS: '-Xmx2G',
    },
    extendEnv: true,
  })
})
