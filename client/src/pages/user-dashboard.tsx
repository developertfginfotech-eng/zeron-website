import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Clock,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Activity,
  CreditCard,
  Users,
  Calendar,
  Settings,
  Bell,
  LogOut
} from 'lucide-react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [kycStatus, setKycStatus] = useState('pending');
  const [kycCompletionPercentage, setKycCompletionPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load initial data from localStorage
        const userData = localStorage.getItem('zaron_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setKycStatus(parsedUser.kycStatus || 'pending');

          // Fetch latest KYC data from backend
          const token = parsedUser.token || localStorage.getItem('zaron_token');
          if (token) {
            const response = await fetch('http://13.50.13.193:5000/api/kyc', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const kycData = await response.json();
              console.log('KYC API Response:', kycData);
              
              if (kycData.success) {
                // Update KYC status from backend
                setKycStatus(kycData.data.status || 'pending');
                setKycCompletionPercentage(kycData.data.completionPercentage || 0);
                
                // Update localStorage with fresh KYC status
                const updatedUser = { ...parsedUser, kycStatus: kycData.data.status };
                localStorage.setItem('zaron_user', JSON.stringify(updatedUser));
                setUser(updatedUser);
              }
            } else if (response.status === 404) {
              // No KYC data found - user hasn't started KYC
              setKycStatus('pending');
              setKycCompletionPercentage(0);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch KYC data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Mock user investment data - replace with real API calls
  const userStats = {
    totalInvestment: 25000,
    totalReturns: 3750,
    activeProperties: 3,
    portfolioGrowth: 15.2
  };

  const userInvestments = [
    {
      id: 1,
      propertyName: 'NEOM Residential Complex',
      invested: 10000,
      currentValue: 11500,
      returns: 1500,
      returnPercentage: 15.0,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'
    },
    {
      id: 2,
      propertyName: 'Riyadh Office Tower',
      invested: 8000,
      currentValue: 8800,
      returns: 800,
      returnPercentage: 10.0,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400'
    },
    {
      id: 3,
      propertyName: 'Red Sea Resort',
      invested: 7000,
      currentValue: 8450,
      returns: 1450,
      returnPercentage: 20.7,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'investment', property: 'NEOM Residential', amount: 10000, date: '2024-09-20' },
    { id: 2, type: 'return', property: 'Riyadh Office Tower', amount: 400, date: '2024-09-18' },
    { id: 3, type: 'investment', property: 'Red Sea Resort', amount: 7000, date: '2024-09-15' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('zaron_token');
    localStorage.removeItem('zaron_user');
    window.location.href = '/website/invest';
  };

  const getKYCStatusDisplay = () => {
    switch (kycStatus) {
      case 'approved': return { text: 'Approved', variant: 'default' };
      case 'submitted': return { text: 'Under Review', variant: 'secondary' };
      case 'under_review': return { text: 'Under Review', variant: 'secondary' };
      case 'rejected': return { text: 'Rejected', variant: 'destructive' };
      default: return { text: 'Pending', variant: 'secondary' };
    }
  };

  const statusDisplay = getKYCStatusDisplay();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <PieChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">My Portfolio</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.firstName || user?.fullNameEnglish || 'Investor'}!
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* KYC Status Badge */}
            <Badge 
              variant={statusDisplay.variant}
              className="capitalize"
            >
              KYC: {statusDisplay.text}
            </Badge>
            
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KYC Warning for non-approved users */}
        {kycStatus !== 'approved' && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    {kycStatus === 'submitted' || kycStatus === 'under_review' 
                      ? 'KYC Under Review' 
                      : kycStatus === 'rejected'
                      ? 'KYC Verification Required'
                      : 'Complete Your KYC Verification'
                    }
                  </h3>
                  <p className="text-yellow-800 text-sm mb-4">
                    {kycStatus === 'submitted' || kycStatus === 'under_review' 
                      ? 'Your KYC documents are being reviewed. You\'ll be notified once approved.'
                      : kycStatus === 'rejected'
                      ? 'Your KYC was rejected. Please resubmit with correct documents.'
                      : 'Your account has limited features. Complete KYC verification to unlock full investment capabilities.'
                    }
                  </p>
                  
                  {/* Show completion progress if KYC is in progress */}
                  {kycCompletionPercentage > 0 && kycStatus === 'pending' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>KYC Progress</span>
                        <span>{kycCompletionPercentage}%</span>
                      </div>
                      <Progress value={kycCompletionPercentage} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    {(kycStatus === 'pending' || kycStatus === 'rejected') && (
                      <Button 
                        size="sm" 
                        onClick={() => window.location.href = '/kyc-verification'}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        {kycStatus === 'rejected' ? 'Resubmit KYC' : 'Complete KYC'}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success message for approved KYC */}
        {kycStatus === 'approved' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">KYC Verified</h3>
                  <p className="text-green-800 text-sm">Your account is fully verified. You can now access all investment features.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <p className="text-2xl font-bold">SAR {userStats.totalInvestment.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Across {userStats.activeProperties} properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <p className="text-2xl font-bold text-green-600">SAR {userStats.totalReturns.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-600">+{userStats.portfolioGrowth}% this year</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Properties</p>
                  <p className="text-2xl font-bold">{userStats.activeProperties}</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Investment diversification</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio Value</p>
                  <p className="text-2xl font-bold">SAR {(userStats.totalInvestment + userStats.totalReturns).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Current market value</p>
            </CardContent>
          </Card>
        </div>

        {/* My Investments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Investments</CardTitle>
              <CardDescription>Your active property investments</CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              New Investment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userInvestments.map((investment) => (
                <Card key={investment.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={investment.image} 
                      alt={investment.propertyName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 text-white">
                        +{investment.returnPercentage}%
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{investment.propertyName}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Invested:</span>
                        <span>SAR {investment.invested.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current Value:</span>
                        <span>SAR {investment.currentValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Returns:</span>
                        <span className="text-green-600">+SAR {investment.returns.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'investment' 
                        ? 'bg-blue-100' 
                        : 'bg-green-100'
                    }`}>
                      {transaction.type === 'investment' ? (
                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{transaction.property}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'investment' 
                        ? 'text-blue-600' 
                        : 'text-green-600'
                    }`}>
                      {transaction.type === 'investment' ? '-' : '+'}SAR {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Browse Properties</h3>
              <p className="text-sm text-muted-foreground">Explore new investment opportunities</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibulous mb-2">Portfolio Analysis</h3>
              <p className="text-sm text-muted-foreground">Detailed performance insights</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Manage Funds</h3>
              <p className="text-sm text-muted-foreground">Add funds or withdraw returns</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;