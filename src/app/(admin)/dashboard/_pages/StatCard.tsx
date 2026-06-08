interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  iconBg: string
  iconColor: string
}

export const StatCard = ({
  title,
  value,
  icon,
  iconBg,
  iconColor,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-50 flex items-center gap-4">
      <div className={`p-4 rounded-lg ${iconBg} ${iconColor}`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
      </div>
    </div>
  )
}
