# aaPanel PostgreSQL Setup Guide

Use this guide when you want to host the PostgreSQL database on your dedicated server that runs aaPanel instead of running PostgreSQL locally on Windows.

## 1. Install PostgreSQL from aaPanel

1. Log in to your aaPanel dashboard.
2. Go to **App Store** (or **Software Store**).
3. Search for **PostgreSQL** and install the version you prefer (15 or 16 is recommended).
4. Wait for the installation to finish.

## 2. Create a Database

1. In aaPanel, go to **Databases** > **PostgreSQL**.
2. Click **Add Database**.
3. Enter the following details and save:
   - **Database name:** `cosmamtic_db`
   - **Username:** `cosmamtic_user`
   - **Password:** generate a strong password and save it securely
   - **Access rights:** choose **All servers** (or whitelist your office/shop IP if you want tighter security)

## 3. Allow Remote Connections (if required)

If your Next.js dev machine is on a different network than the server, you may need to allow remote access to PostgreSQL.

### Option A: Use aaPanel firewall
1. Go to **Security** > **Firewall**.
2. Add a rule to allow inbound TCP traffic on port **5432** from your IP only (do not open it to 0.0.0.0/0 unless you also have strong credentials + SSL).

### Option B: Configure PostgreSQL manually on the server
SSH into your server and edit these files if needed:

```bash
# Edit postgresql.conf to listen on all interfaces
sudo nano /www/server/postgresql/data/postgresql.conf
# Find listen_addresses and set:
listen_addresses = '*'

# Edit pg_hba.conf to allow your IP
sudo nano /www/server/postgresql/data/pg_hba.conf
# Add a line at the bottom (replace 1.2.3.4 with your office IP):
host    cosmamtic_db    cosmamtic_user    1.2.3.4/32    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
# or via aaPanel services panel
```

> aaPanel usually manages these files for you; only do this if the remote connection fails.

## 4. Configure Your Local `.env`

In the project folder, open `web/.env` and replace the `DATABASE_URL` with your server details:

```env
DATABASE_URL="postgresql://cosmamtic_user:YOUR_STRONG_PASSWORD@YOUR_SERVER_IP:5432/cosmamtic_db?schema=public"
```

If your server requires SSL, append `&sslmode=require`:

```env
DATABASE_URL="postgresql://cosmamtic_user:YOUR_STRONG_PASSWORD@YOUR_SERVER_IP:5432/cosmamtic_db?schema=public&sslmode=require"
```

## 5. Run Migrations and Seed Data

Open PowerShell in the `D:\GIT-HUB\cosmamtic-kimi\web` folder and run:

```powershell
npx prisma migrate dev --name init
npx prisma db seed
```

The first command creates the database tables. The second command inserts the starting data (tenant, branches, admin user, chart of accounts, units, warehouses).

## 6. Verify the Connection

You can verify the database connection at any time with:

```powershell
npx prisma studio
```

This opens Prisma Studio in your browser so you can browse the database tables.

## Default Login After Seed

After seeding, the default owner user is:
- **Email:** `owner@cosmamtic.com`
- **Password:** `admin123`

Change this password immediately after first login in a production environment.

## Next Steps

Once the database is connected and seeded, you can start the Next.js dev server:

```powershell
npm run dev
```

Then open `http://localhost:2025` to use the application.

## Deploying the App to Your Dedicated Server (Optional)

For easier future updates, store your project in a Git repository and deploy it on the same dedicated server that runs aaPanel.

### 1. Push your local project to a private Git repository

From the root project folder on your Windows machine:

```powershell
cd D:\GIT-HUB\cosmamtic-kimi

git init
git add .
git commit -m "Initial ERP/POS foundation"

# Add your remote (GitHub, GitLab, Bitbucket, or your own Git server)
git remote add origin https://github.com/onenet786/cosmamtic-kimi.git

git branch -M main
git push -u origin main
```

> Keep `.env` out of Git by ensuring it is listed in `.gitignore` (already included in the project).

### 2. Clone the project on your dedicated server

SSH into your server and run:

```bash
# Install Node.js 20+ if not already present
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repository into your domain folder
# GitHub no longer accepts your account password here. Use a Personal Access Token (PAT) instead.
# If your repo is private, create a PAT at https://github.com/settings/tokens with "repo" scope.
# If you want public clone without a token, set the repo to Public on GitHub first.
cd /www/wwwroot
git clone https://github.com/onenet786/cosmamtic-kimi.git coskimi.binishaqsoft.com
cd coskimi.binishaqsoft.com/web

# Install dependencies
npm install --legacy-peer-deps

# Copy and edit environment variables
cp .env.example .env
nano .env
```

Set the `DATABASE_URL` to your aaPanel PostgreSQL server details from the step above.

### GitHub Authentication Note

If `git clone` asks for a username/password, GitHub is rejecting your account password because password authentication is disabled for Git operations.

You have two options:

**Option A: Make the repo public (simplest for a single server)**
1. Go to `https://github.com/onenet786/cosmamtic-kimi/settings`.
2. Scroll down to **Danger Zone** > **Change repository visibility**.
3. Set it to **Public**.
4. Now `git clone` and `git pull` work without any password.

**Option B: Use a Personal Access Token (PAT)**
1. Create a token at `https://github.com/settings/tokens` with **repo** scope.
2. Use the token as the password when prompted, or embed it in the URL:
   ```bash
   git clone https://YOUR_TOKEN@github.com/onenet786/cosmamtic-kimi.git coskimi.binishaqsoft.com
   ```
3. To avoid entering the token every time, store it with Git's credential helper:
   ```bash
   git config --global credential.helper store
   # Run one git operation that asks for credentials, then it is cached
   cd coskimi.binishaqsoft.com
   git pull
   ```

### 3. Build and run the production app

```bash
# Generate Prisma client and run migrations
npx prisma generate
npx prisma migrate deploy
npx prisma db seed

# Build the app for production
npm run build

# Start the production server
npm start
```

By default, this runs on `http://localhost:2025`. You can use aaPanel's **Node.js Project Manager** or **PM2** to keep it running and expose it through a reverse proxy (Nginx) on aaPanel.

### 4. Update the app in the future

When you make changes locally and push them:

```powershell
cd D:\GIT-HUB\cosmamtic-kimi

git add .
git commit -m "Describe your update"
git push origin main
```

On your dedicated server, pull and restart:

```bash
cd /www/wwwroot/coskimi.binishaqsoft.com/web

git pull origin main
npm install --legacy-peer-deps
npx prisma migrate deploy
npm run build

# Restart the Node.js process in aaPanel or PM2
```

Using Git makes every future update a simple `git pull`, `npm install`, `npm run build`, and restart.
