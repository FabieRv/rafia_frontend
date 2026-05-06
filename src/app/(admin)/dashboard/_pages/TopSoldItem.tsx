export const TopSoldItem = ({
  name,
  percentage,
  color,
}: {
  name: string
  percentage: number
  color: string
}) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1 text-sm font-medium">
      <span>{name}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div
        className={`h-1.5 rounded-full ${color} transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
)
