require.paths.unshift('vendor', 'vendor/mu/lib', 'vendor/restler/lib', 'lib/twitter', 'spec/lib')

require("jspec")

print    = require('sys').puts
quit     = process.exit
readFile = require('fs').readFileSync

function run(specs) {
  specs.forEach(function(spec){
    JSpec.exec('spec/spec.' + spec + '.js')
  })
}

specs = {
  independant: [
    'mustache',
    'twitter.tweet'
    ]
}

switch (process.ARGV[2]) {
  case 'all':
    run(specs.independant)
    break
  default: 
    run([process.ARGV[2]])
}

JSpec.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true }).report()
