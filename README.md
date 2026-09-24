# Cascade Hills Recording Studio

Vue 3 + Vite website with an Express contact API, MariaDB persistence, and SMTP notification email.

## Local development

```bash
npm install
cp .env.example .env
npm run dev:api
```

In a second terminal, run `npm run dev`. Vite proxies `/api` requests to the API on port 3001.

## Production build

```bash
npm ci
npm run build
```

Publish the contents of `dist/` to `/var/www/cascade-hills`. The supplied Caddyfile serves the Vue history fallback and proxies `/api/*` to the API bound to `127.0.0.1:3001`.

## Database

Run `database/schema.sql` on the MariaDB server, then create a least-privilege application user:

```sql
CREATE USER 'cascade_hills_web'@'192.168.1.%' IDENTIFIED BY 'use-a-strong-password';
GRANT SELECT, INSERT, UPDATE ON cascade_hills_web.* TO 'cascade_hills_web'@'192.168.1.%';
FLUSH PRIVILEGES;
```

Restrict the host pattern further when the web server's exact address is known.

## Doppler variables

The `cascade-hills-web` / `prd` configuration needs:

- `DB_HOST` (`192.168.1.8`)
- `DB_PORT` (`3306`)
- `DB_NAME` (`cascade_hills_web`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_CONNECTION_LIMIT` (optional; defaults to `5`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_USESSL`
- `FROM_EMAIL_ADDRESS`, `FROM_EMAIL_NAME`
- `CONTACT_TO_EMAIL`
- `PORT` (optional; defaults to `3001`)

`SMTP_SECURITY` may remain in Doppler for documentation, but Nodemailer uses `SMTP_USESSL` and `SMTP_PORT`.

## Contact API service

Copy `deploy/cascade-hills-api.service` to `/etc/systemd/system/`, adjust `WorkingDirectory` if necessary, then run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now cascade-hills-api
curl http://127.0.0.1:3001/api/health
```

## Carousel photographs

Replace the temporary carousel panels by adding these files to `public/`:

- `studio-01.jpg`
- `studio-02.jpg`
- `studio-03.jpg`

The carousel automatically displays them without code changes.
