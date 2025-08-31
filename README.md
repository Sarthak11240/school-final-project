# School Project (Next.js + Cloudinary + MySQL)

This project stores school data (name, address, city, state, contact, email, image). Images are uploaded to Cloudinary so the app works both locally and when hosted (Vercel/Netlify). Database can be local MySQL or a remote provider (PlanetScale).

## Setup (local)

1. Copy `.env.local.example` to `.env.local` and fill values.

2. Install dependencies:
```bash
npm install
```

3. Ensure MySQL is running and create DB (if not using remote DATABASE_URL):
```sql
# optional - lib/db will attempt to bootstrap but you can create manually
CREATE DATABASE schoolDB;
USE schoolDB;
```

4. Run locally:
```bash
npm run dev
```

Open http://localhost:3000/addSchool and http://localhost:3000/showSchools

## Deployment (Vercel)

- Set the same environment variables on Vercel (Cloudinary creds + DB connection). For PlanetScale use DATABASE_URL.
- Deploy the repo on Vercel — it will connect to Cloudinary for images.

