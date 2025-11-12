export default function StatCard({ icon, title, value, color }) {
  return (
    <div
      className={`flex flex-col justify-between p-4 rounded-xl shadow-md ${color}`}
    >
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}
