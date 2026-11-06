# Playwright Tests

## What these tests cover

These tests cover some of the smoke tests for the Bowls app, some defect tests, some Data driven tests and API tests

## Before you start

- Install the project dependencies: `npm install`
- Install Playwright browsers if needed: `npx playwright install`
- Set up the locally running site from the README.md

## Run tests

Run the full Playwright suite:
```bash
npm run full:test
```

Run tests with the browser visible:
```bash
npm run test:headed
```

Debug tests:
```bash
npm run test:debug
```

Open Playwright UI mode:
```bash
npm run test:ui
```

Run smoke tests:
```bash
npm run test:smoke
```

Re-run the tests that failed most recently:
```bash
npm run test:failed
```

Open Playwright Codegen:
```bash
npm run codegen
```

View the HTML test report:
```bash
npm run report
```

Run API tests tagged `@api`:
```bash
npx playwright test --grep @api
```

Run tests in Firefox:
```bash
npx playwright test --project=firefox
```

Run tests in mobile Chrome emulation (if your project is named `mobile-chromium`) go into the config and uncomment `Mobile Chrome` and change it to `mobile-chromium` if its not already done:
```bash
npx playwright test --project=mobile-chromium
```

Defect tests tagged `@defect`:
```bash
npm run test:defect
```

## Tests currently included

- **Booking smoke test:** completes a booking journey through the UI.
- **API tests:** checks that `GET /api/bookings` returns bookings and that `POST /api/bookings` rejects a request with missing slots.
- **Login tests:** checks successful login and sign-out, plus rejection of invalid login details.
- **Registration tests:** checks registration with generated details and validation for invalid registration data.
- **Page smoke test:** checks the home page title and heading.
- **Defect tests:** covers booking in the past and registration without a slug.