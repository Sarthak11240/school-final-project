import Link from 'next/link';

export default function Home(){ 
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl card">
        <h1 className="text-2xl font-bold mb-4">School Directory</h1>
        <p className="mb-4">Add and browse schools. Works locally and on Vercel/Netlify (uses Cloudinary for images).</p>
        <div className="flex gap-2">
          <Link href="/addSchool" className="px-3 py-2 bg-indigo-600 text-white rounded">Add School</Link>
          <Link href="/showSchools" className="px-3 py-2 bg-green-600 text-white rounded">Show Schools</Link>
        </div>
      </div>
    </div>
  );
}
