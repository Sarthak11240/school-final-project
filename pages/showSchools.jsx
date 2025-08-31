import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ShowSchools() {
  const { data, error } = useSWR('/api/getSchools', fetcher);

  if (error) return <div className="p-6">Failed to load</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Schools</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.schools.map((s, i) => (
          <motion.div key={s.id} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="overflow-hidden rounded-xl">
              <img src={s.image} alt={s.name} className="w-full h-48 object-cover transform transition-transform hover:scale-105" />
            </div>
            <h3 className="text-lg font-semibold mt-3">{s.name}</h3>
            <p className="text-sm text-gray-600">{s.address}</p>
            <p className="text-sm text-gray-500">{s.city}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
