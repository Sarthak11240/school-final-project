import { useForm } from 'react-hook-form';
import { useState } from 'react';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [message, setMessage] = useState(null);

  const onSubmit = async (values) => {
    setMessage(null);
    try {
      const file = values.image[0];
      const imageBase64 = await getBase64(file);

      const res = await fetch('/api/addSchool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, imageBase64 }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setMessage({ type: 'success', text: data.message });
      reset();
    } catch (e) {
      setMessage({ type: 'error', text: e.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl card">
        <h2 className="text-xl font-bold mb-4">Add School</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold mb-1">Name</label>
            <input {...register('name', { required: true })} className="input p-2 w-full border rounded" />
            {errors.name && <p className="text-red-600 text-sm">Name is required</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input {...register('email_id', { required: true, pattern: /^\S+@\S+$/i })} className="input p-2 w-full border rounded" />
            {errors.email_id && <p className="text-red-600 text-sm">Valid email required</p>}
          </div>

          <div>
  <label className="block text-sm font-semibold mb-1">Contact</label>
  <input
    type="tel"
    {...register('contact', { required: true, pattern: /^[0-9]{7,15}$/ })}
    maxLength={15}
    className="input p-2 w-full border rounded"
  />
  {errors.contact && (
    <p className="text-red-600 text-sm">Contact must be 7–15 digits</p>
  )}
</div>



          <div>
            <label className="block text-sm font-semibold mb-1">State</label>
            <input {...register('state', { required: true })} className="input p-2 w-full border rounded" />
            {errors.state && <p className="text-red-600 text-sm">State required</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input {...register('address', { required: true })} className="input p-2 w-full border rounded" />
            {errors.address && <p className="text-red-600 text-sm">Address required</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input {...register('city', { required: true })} className="input p-2 w-full border rounded" />
            {errors.city && <p className="text-red-600 text-sm">City required</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Image</label>
            <input type="file" accept="image/*" {...register('image', { required: true })} className="w-full" />
            {errors.image && <p className="text-red-600 text-sm">Image required</p>}
          </div>

          <div className="md:col-span-2">
            <button disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded-lg">
              {isSubmitting ? 'Saving...' : 'Add School'}
            </button>
            {message && <p className={message.type==='success' ? 'text-green-600 mt-2' : 'text-red-600 mt-2'}>{message.text}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
