module.exports = {
  cache: false,
  extension: ['.ts'],
  instrument: true,
  sourceMap: true,
  reporter: ['lcov', 'html', 'text'],
  exclude: ['ormconfig.js', 'src/entities'],

  // Coverage thresholds
  branches: 100,
  lines: 100,
  functions: 100,
  statements: 100,
};
