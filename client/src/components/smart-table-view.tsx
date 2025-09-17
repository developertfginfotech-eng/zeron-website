import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Brain, 
  TrendingUp,
  AlertTriangle,
  Star,
  Eye,
  Edit,
  MoreHorizontal,
  Download,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

interface TableData {
  id: string
  name: string
  email?: string
  value?: number
  status: string
  aiScore?: number
  lastActivity?: string
  type?: string
  location?: string
  yield?: number
}

interface SmartTableProps {
  title: string
  description: string
  data: TableData[]
  type: 'users' | 'properties'
  columns: string[]
}

export function SmartTableView({ title, description, data, type }: SmartTableProps) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAiInsights, setShowAiInsights] = useState(true)

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': case 'rejected': return 'bg-red-100 text-red-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAiRecommendations = () => {
    if (type === 'users') {
      return [
        { text: '12 users ready for premium property offers', confidence: 0.89, type: 'opportunity' },
        { text: '3 high-value users at risk of churn', confidence: 0.76, type: 'risk' },
        { text: '8 users perfect for luxury segment', confidence: 0.82, type: 'upsell' }
      ]
    } else {
      return [
        { text: '2 properties showing high demand signals', confidence: 0.91, type: 'trending' },
        { text: '1 property yield optimization opportunity', confidence: 0.84, type: 'optimization' },
        { text: '4 properties ideal for current market', confidence: 0.78, type: 'market-fit' }
      ]
    }
  }

  const renderTableView = () => (
    <Card className="glass-morphism">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              {type === 'users' ? (
                <>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Invested</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Actions</TableHead>
                </>
              ) : (
                <>
                  <TableHead>Property</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>Actions</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover-elevate cursor-pointer"
                data-testid={`table-row-${item.id}`}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {type === 'properties' && item.type && (
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                
                {type === 'users' ? (
                  <>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(item.status)} border-0`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      SAR {item.value?.toLocaleString() || '0'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.aiScore}/100</span>
                        <div className={`w-2 h-2 rounded-full ${
                          (item.aiScore || 0) > 80 ? 'bg-green-500' :
                          (item.aiScore || 0) > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(item.status)} border-0`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      SAR {item.value?.toLocaleString() || '0'}
                    </TableCell>
                    <TableCell className="font-medium text-green-600">
                      {item.yield}%
                    </TableCell>
                  </>
                )}
                
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" data-testid={`button-view-${item.id}`}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredData.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="glass-morphism hover-elevate cursor-pointer" data-testid={`grid-card-${item.id}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {item.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {type === 'users' ? item.email : item.location}
                  </p>
                </div>
                <Badge className={`${getStatusColor(item.status)} border-0 text-xs`}>
                  {item.status}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {type === 'users' ? 'Total Invested' : 'Property Value'}
                  </span>
                  <span className="font-medium">SAR {item.value?.toLocaleString() || '0'}</span>
                </div>
                
                {type === 'properties' && item.yield && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Yield</span>
                    <span className="font-medium text-green-600">{item.yield}%</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">AI Score</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.aiScore}/100</span>
                    <div className={`w-2 h-2 rounded-full ${
                      (item.aiScore || 0) > 80 ? 'bg-green-500' :
                      (item.aiScore || 0) > 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border/50">
                <Button variant="ghost" size="sm" className="flex-1" data-testid={`button-view-grid-${item.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6" data-testid="smart-table-view">
      {/* Header */}
      <Card className="glass-morphism border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showAiInsights ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAiInsights(!showAiInsights)}
                className="neon-glow"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Insights Panel */}
      {showAiInsights && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="glass-morphism border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-primary" />
                <h4 className="font-semibold">AI-Powered Insights</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getAiRecommendations().map((rec, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50 hover-elevate">
                    <div className="flex items-center gap-2 mb-2">
                      {rec.type === 'opportunity' && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {rec.type === 'risk' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {rec.type === 'upsell' && <Star className="h-4 w-4 text-purple-600" />}
                      {rec.type === 'trending' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      {rec.type === 'optimization' && <Zap className="h-4 w-4 text-orange-600" />}
                      {rec.type === 'market-fit' && <Star className="h-4 w-4 text-green-600" />}
                      <Badge variant="outline" className="text-xs">
                        {Math.round(rec.confidence * 100)}%
                      </Badge>
                    </div>
                    <p className="text-sm">{rec.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters and Controls */}
      <Card className="glass-morphism">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${type}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
                data-testid="input-search"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
                data-testid="button-table-view"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                data-testid="button-grid-view"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Display */}
      {viewMode === 'table' ? renderTableView() : renderGridView()}
    </div>
  )
}