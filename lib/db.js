import mysql from 'mysql2/promise';
let pool = null;

function parseDatabaseUrl(url) {
  try {
    const withoutProto = url.replace('mysql://', '');
    const [userPass, hostAndRest] = withoutProto.split('@');
    const [user, password] = userPass.split(':');

    // host may include port
    const [hostPort, dbAndQs] = hostAndRest.split('/');
    const [host, port] = hostPort.split(':');

    const [database] = dbAndQs.split('?');
    return { host, port: port || 3306, user, password, database };
  } catch (e) {
    return null;
  }
}

export default async function getPool() {
  if (pool) return pool;

  if (process.env.DATABASE_URL) {
    // For Railway or PlanetScale (use DATABASE_URL)
    const cfg = parseDatabaseUrl(process.env.DATABASE_URL);
   pool = mysql.createPool({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false,   // ✅ allow Railway’s self-signed cert
  },
});


  } else {
    // For local MySQL (XAMPP/WAMP)
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'schoolDB',
      waitForConnections: true,
      connectionLimit: 10,
    });

    // Auto-create DB and table in local dev
    const conn = await pool.getConnection();
    try {
      await conn.query('CREATE DATABASE IF NOT EXISTS ??', [process.env.DB_NAME || 'schoolDB']);
      await conn.query('USE ??', [process.env.DB_NAME || 'schoolDB']);
      await conn.query(`
        CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name TEXT NOT NULL,
          address TEXT,
          city TEXT,
          state TEXT,
          contact VARCHAR(100),
          image TEXT,
          email_id TEXT
        )
      `);
    } finally {
      conn.release();
    }
  }

  return pool;
}
