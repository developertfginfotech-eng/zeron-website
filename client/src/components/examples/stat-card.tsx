import { StatCard } from '../stat-card'
import { Users, Building2, TrendingUp, DollarSign } from 'lucide-react'

export default function StatCardExample() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value="2,847"
        change="+12% from last month"
        changeType="positive"
        icon={Users}
      />
      <StatCard
        title="Active Properties"
        value="24"
        change="+3 new this week"
        changeType="positive"
        icon={Building2}
      />
      <StatCard
        title="Total Investments"
        value="SAR 14.2M"
        change="+8% from last month"
        changeType="positive"
        icon={TrendingUp}
      />
      <StatCard
        title="Monthly Revenue"
        value="SAR 890K"
        change="-2% from last month"
        changeType="negative"
        icon={DollarSign}
      />
    </div>
  )
}