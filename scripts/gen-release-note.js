const version = process.argv[2] || process.env.VERSION
const cc = require('conventional-changelog')
const vName = version ? `v${version}` : `no-version`
const file = `./release-note/${vName}.md`
const fileStream = require('fs').createWriteStream(file)

cc({
  preset: 'angular',
  pkg: {
    transform (pkg) {
      pkg.version = vName
      return pkg
    }
  }
}).pipe(fileStream).on('close', () => {
  console.log(`Generated release note at ${file}`)
})
