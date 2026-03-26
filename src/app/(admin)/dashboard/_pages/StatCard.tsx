interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  percentage: number
  color: string
}

export const StatCard = ({
  title,
  value,
  icon,
  percentage,
  color,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        {/* Icone avec fond de couleur */}
        <div className={`p-3 rounded-full text-white ${color}`}>{icon}</div>

        {/* Cercle de progression simplifié */}
      </div>

      <div className="flex items-center justify-between">
        <div className="mt-4">
          <h3 className="text-gray-500 text-lg font-text">{title}</h3>
          <p className="text-2xl font-extrabold text-slate-800 mt-1">{value}</p>
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-gray-100"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={175}
              strokeDashoffset={175 - (175 * percentage) / 100}
              className={`${color.replace(
                "bg-",
                "text-"
              )} transition-all duration-1000`}
            />
          </svg>
          <span className="absolute text-[10px] font-bold">{percentage}%</span>
        </div>
      </div>
      <p className="text-[14px] text-gray-400 mt-4 italic">
        Dernières 24 heures
      </p>
    </div>
  )
}
