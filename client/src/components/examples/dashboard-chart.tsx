import { DashboardChart } from '../dashboard-chart'

const mockData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 2210 },
  { name: 'Mar', value: 2290 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 2181 },
  { name: 'Jun', value: 2500 },
  { name: 'Jul', value: 2100 },
]

export default function DashboardChartExample() {
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Monthly Investments"
          description="Investment volume over the last 7 months"
          data={mockData}
          type="bar"
          dataKey="value"
        />
        <DashboardChart
          title="User Growth"
          description="New user registrations trend"
          data={mockData}
          type="line"
          dataKey="value"
        />
      </div>
    </div>
  )
}