import getPool from '../../lib/db';

export default async function handler(req, res) {
  try {
    const pool = await getPool();
    const [rows] = await pool.query('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
    res.status(200).json({ schools: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}
