import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null

  const { month, totalAmount, items } = payload[0].payload

  return (
    <div className="card">
      <div className="font-medium mb-1 horizontal-line">{month}</div>
      <div className="font-semibold horizontal-line ">
        Total:<span className='text-blue-700 ml-1 '>₹{totalAmount.toLocaleString()}</span> 
      </div>
      <div className="mt-2">
        <div className="font-medium text-gray-800">Details:</div>
        {items.map((item, idx) => (
          <div key={idx} className="text-gray-600">
            {item.name}: ₹{item.amount.toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  )
}

const CustomLineChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center text-gray-400">No data available</div>
    )
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity={0.6} />
              <stop offset="70%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" className="text-xs" axisLine={false} tickLine={false}/>
          <YAxis
            tickFormatter={(val) => `₹${val.toLocaleString()}`}
            className="text-xs" axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="natural"
            dataKey="totalAmount"
            stroke="#2563eb" // Tailwind's purple-600
            strokeWidth={2}
            fill="url(#blueGradient)"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart
