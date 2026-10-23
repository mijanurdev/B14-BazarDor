export default function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-600">
      <span>সাজান</span>
      <select
        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-high">দাম: কম থেকে বেশি</option>
        <option value="high-low">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
