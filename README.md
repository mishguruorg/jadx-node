# jadx-node

[![CircleCI](https://circleci.com/gh/mishguruorg/jadx-node/tree/master.svg?style=svg)](https://circleci.com/gh/mishguruorg/jadx-node/tree/master)

A light wrapper around jadx, a java decompiler.

## Why?

- You don't need to have `jadx` installed locally. A copy is bundled with this
  package.
- You can use this library to invoke `jadx` without having to spawn the process
  yourself.
- Jadx memory usage is capped at 2GB, to minimise crashing from out-of-memory
  errors.
- Jadx is configured to skip resources, show code that it can't decompile and
  use up to 6 threads.

## CLI Usage

```bash
$ npm install --global @mishguru/jadx-node
```

```bash
$ jadx-node --input ./classes.dex --output ./decompiledResult/
```

## JavaScript Usage

```bash
$ npm install --save @mishguru/jadx-node
```

```javascript
import jadx from '@mishguru/jadx-node'

const source ='./classes.dex'
const destination = './decompiledResult/'

await jadx(source, destination)
```

## LICENSE

Copyright 2019 Mish Guru Ltd

Permission to use, copy, modify, and/or distribute this software for any purpose 
with or without fee is hereby granted, provided that the above copyright notice 
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH 
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND 
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, 
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM 
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR 
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR 
PERFORMANCE OF THIS SOFTWARE.
