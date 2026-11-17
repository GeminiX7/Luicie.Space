# Luicie.Space Storefront

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `DATABASE_URL` to a PostgreSQL connection string.
4. Generate a unique session secret with:

   ```sh
   node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
   ```

   Put the output in `AUTH_SECRET`. The application requires at least 32 bytes and has no built-in fallback.
5. Before initializing an empty database, set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`. Use a unique admin password of at least 16 characters. `SEED_ADMIN_NAME` is optional.
6. Apply migrations with `npm run db:migrate`, then start the app with `npm run dev`.

The initial storefront seed creates demo products, reviews, and orders, plus the administrator configured by the seed environment variables. Do not use demo seed data for a live store unless it has been replaced with the store's real catalog.

Existing databases are not changed by this seed-code update. Before exposing a previously seeded database, reset any old demo account passwords and rotate `AUTH_SECRET` if that deployment used the former built-in fallback.

## Password management

Apply database changes with `npm run db:migrate` before deploying this version. Signed-in admins can change their own password from the admin sidebar; buyers can change theirs from their account page. Password changes require the current password and a new password of at least 12 characters.

Admins can issue a buyer a temporary password from **Admin → Customers**. The generated password is displayed only once; share it with the buyer privately. Their existing sessions are invalidated, and they must choose a new password immediately after signing in with the temporary one. Admins should never ask buyers to send their existing password.

Never commit `.env.local` or production environment files.
