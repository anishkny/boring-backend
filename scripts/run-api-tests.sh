#!/usr/bin/env bash
set -euxo pipefail

# Setup
export PORT=3000
export APIURL=http://localhost:${PORT}/api
export SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$SCRIPTDIR/.."

# Build code
npm run build

# Verify environment variables are set
node -e 'require("dotenv-extended").load({ errorOnMissing: true, includeProcessEnv: true, })'

# Ensure port is open
npx wait-on --timeout 10000 --reverse tcp:$PORT

# Start server for testing
npx rimraf .nyc_output/ coverage/
npx nyc node ./dist/src/index.js &
export API_PID=$!
npx wait-on --timeout 10000 tcp:$PORT

# Run Postman tests
npx newman run ./scripts/postman-collection.json \
  --bail --reporters cli,htmlfull \
  --env-var "baseUrl=${APIURL}"

# Stop server
kill $API_PID
sleep 1

# Ensure coverage is maintained
npx nyc check-coverage
