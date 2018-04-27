# jadx-node

[![CircleCI](https://circleci.com/gh/mishguruorg/jadx-node/tree/master.svg?style=svg)](https://circleci.com/gh/mishguruorg/jadx-node/tree/master)

A light wrapper around jadx, a java decompiler.


## Install

```bash
npm install @mishguru/jadx-node
```

## Usage

```javascript
import runJadx from '@mishguru/jadx-node'

const source ='/path/to/target/classes.dex'
const destination = '/Users/brendon/decompiledResult/'

await runJadx(source, destination)
```

## LICENSE

Copyright 2018 Mish Guru Ltd

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
