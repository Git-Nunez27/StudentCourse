import Button from './Button';

export default function Form({ fields, onSubmit, submitLabel = 'Submit', loading = false }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              defaultValue={field.value || ''}
              placeholder={field.placeholder}
              required={field.required}
              className="input-field resize-none h-24"
            />
          ) : (
            <input
              type={field.type || 'text'}
              name={field.name}
              defaultValue={field.value || ''}
              placeholder={field.placeholder}
              required={field.required}
              className="input-field"
            />
          )}
        </div>
      ))}
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? 'Loading...' : submitLabel}
      </Button>
    </form>
  );
}
