# Supabase with Sentry Test

A test project demonstrating Supabase Edge Functions with Sentry integration for error monitoring and logging.

## 🚀 Features

- **Supabase Edge Functions**: Deno-based serverless functions
- **Sentry Integration**: Error monitoring and performance tracking
- **Shared Utilities**: Common logging and Sentry setup
- **Test Functions**: Example functions for testing error handling

## 📁 Project Structure

```
├── supabase/
│   ├── functions/
│   │   ├── _shared/
│   │   │   ├── sentry.ts      # Sentry configuration and utilities
│   │   │   └── log.ts         # Logging utilities
│   │   ├── test-function-a/   # Test function A
│   │   ├── test-function-b/   # Test function B
│   │   └── import_map.json    # Deno import map
│   └── config.toml           # Supabase configuration
├── test-commands.txt         # Test commands for local and production
└── tsconfig.json            # TypeScript configuration
```

## 🛠️ Setup

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli)
- [Deno](https://deno.land/) (for local development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd supabase-with-sentry-test
```

2. Install Supabase CLI (if not already installed):
```bash
npm install -g supabase
```

3. Start Supabase locally:
```bash
supabase start
```

## 🚀 Development

### Local Development

1. Start the Supabase local development environment:
```bash
supabase start
```

2. Deploy functions locally:
First, you need to create an .env.local file at the root of the project with the following variables:
```bash
SENTRY_DSN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ENVIRONMENT=development
```
Then execute:
```bash
supabase functions serve --import-map supabase/functions/import_map.json --env-file .env.local
```

3. Run the following command to test the functions:
```bash
# Test function A locally
curl -i --location --request POST 'http://localhost:54321/functions/v1/test-function-a' \
  --header 'Authorization: Bearer SUPABASE_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data ' {"name":"John Doe"}'
```

### Production Deployment

1. Link to your Supabase project:
```bash
supabase link --project-ref <your-project-ref>
```

2. Deploy functions to production:
```bash
supabase functions deploy
```

3. Test the production functions using the same command as in the 'Local development' section, replacing the host with your production URI.

## 📊 Sentry Integration

This project includes Sentry integration for error monitoring and performance tracking:

- **Error Monitoring**: Automatic error capture and reporting
- **Performance Monitoring**: Request tracing and profiling
- **Environment Tagging**: Automatic environment detection
- **Execution Context**: Includes region and execution ID tags

### Sentry Configuration

The Sentry configuration is located in `supabase/functions/_shared/sentry.ts`:

- DSN: Configured for the project's Sentry instance
- Environment: Set to 'production' for deployed functions
- Sampling Rates: 100% for both traces and profiles
- Integrations: Disabled default integrations for Edge Functions

### Using Sentry in Functions

```typescript
import { initSentry, withSentry } from "@sentry";

initSentry();

Deno.serve(withSentry(async (req) => {
  // Your function logic here
  // Errors will be automatically captured and sent to Sentry
}));
```

## 🧪 Testing

### Test Functions

- **test-function-a**: Basic function with error handling
- **test-function-b**: Similar function for comparison testing

### Test Scenarios

1. **Normal Request**: Send a valid name to get a greeting
2. **Missing Name**: Send request without name to trigger validation error
3. **Error Test**: Send `{"name": "error"}` to trigger test error


## 🔧 Configuration

```

### Import Map

The `import_map.json` file defines shared imports:

```json
{
  "imports": {
    "@sentry": "./_shared/sentry.ts",
    "@log": "./_shared/log.ts"
  }
}
```

## 📚 Resources

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Deno Documentation](https://deno.land/manual)
- [Supabase CLI](https://supabase.com/docs/guides/cli)


## 📄 License

This project is licensed under the MIT License. 