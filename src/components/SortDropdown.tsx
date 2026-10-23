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
        className="select select-bordered select-sm bg-white sm:select-md"
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
