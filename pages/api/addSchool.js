import cloudinary from '../../utils/cloudinary';
import getPool from '../../lib/db';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST' });
  try {
    const { name, address, city, state, contact, email_id, imageBase64 } = req.body;

    if (!name || !address || !city || !state || !contact || !email_id || !imageBase64) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const upload = await cloudinary.uploader.upload(imageBase64, { folder: 'school_images' });
    const imageUrl = upload.secure_url;

    const pool = await getPool();
    const [result] = await pool.query('INSERT INTO schools (name,address,city,state,contact,image,email_id) VALUES (?,?,?,?,?,?,?)', [name, address, city, state, contact, imageUrl, email_id]);

    res.status(200).json({ message: 'Saved', id: result.insertId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || 'Server error' });
  }
}
