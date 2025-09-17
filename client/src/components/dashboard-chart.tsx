import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface ChartData {
  name: string
  value: number
  [key: string]: any
}

interface DashboardChartProps {
  title: string
  description?: string
  data: ChartData[]
  type: "bar" | "line"
  dataKey?: string
}

export function DashboardChart({ 
  title, 
  description, 
  data, 
  type, 
  dataKey = "value" 
}: DashboardChartProps) {
  return (
    <Card 
      className="enhanced-card animate-scale-up relative overflow-hidden group" 
      data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="absolute inset-0 gradient-card opacity-50" />
      <CardHeader className="relative z-10">
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground/80">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={300}>
            {type === "bar" ? (
              <BarChart data={data}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" stroke="hsl(var(--muted-foreground))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                />
                <Bar 
                  dataKey={dataKey} 
                  fill="url(#colorGradient)" 
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            ) : (
              <LineChart data={data}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" stroke="hsl(var(--muted-foreground))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={dataKey} 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, r: 6, className: 'animate-pulse' }}
                  activeDot={{ r: 8, className: 'animate-pulse' }}
                  fill="url(#lineGradient)"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}