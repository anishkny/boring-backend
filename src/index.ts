require('dotenv-extended').load({
  errorOnMissing: true,
  includeProcessEnv: true,
});

import 'reflect-metadata';

import * as express from 'express';
import { createConnection } from 'typeorm';

const { PORT } = process.env;

// Main entry point function
async function main(): Promise<void> {
  // Connect to database (or exit)
  await createConnection().catch(
    /* istanbul ignore next */ (e) => {
      console.error('Could not connect to database.', e);
      process.exit(1);
    }
  );

  // Create main Express app
  const app = express();

  // Start serving the API routes
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

main();
