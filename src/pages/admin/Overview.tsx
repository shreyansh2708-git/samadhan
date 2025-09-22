import React from 'react';
import { AlertTriangle, CheckCircle, Clock, FileText, TrendingUp, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Overview = () => {
  const stats = [
    {
      title: 'Total Issues',
      value: '342',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'text-primary',
    },
    {
      title: 'Open Issues',
      value: '89',
      change: '-5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-warning',
    },
    {
      title: 'Resolved This Month',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-success',
    },
    {
      title: 'Avg Resolution Time',
      value: '4.2 days',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'text-primary',
    },
  ];

  const recentIssues = [
    {
      id: 'CR-2024-045',
      title: 'Water Main Break',
      location: 'Downtown District',
      priority: 'High',
      status: 'In Progress',
      assignee: 'Water Dept.',
      time: '2 hours ago',
    },
    {
      id: 'CR-2024-044',
      title: 'Traffic Light Malfunction',
      location: 'Main St & 5th Ave',
      priority: 'Critical',
      status: 'Assigned',
      assignee: 'Traffic Team',
      time: '4 hours ago',
    },
    {
      id: 'CR-2024-043',
      title: 'Graffiti Removal',
      location: 'Community Center',
      priority: 'Low',
      status: 'Acknowledged',
      assignee: 'Parks Dept.',
      time: '1 day ago',
    },
  ];

  const priorityColors = {
    'Critical': 'bg-destructive text-destructive-foreground',
    'High': 'bg-warning text-warning-foreground',
    'Medium': 'bg-primary text-primary-foreground',
    'Low': 'bg-muted text-muted-foreground',
  };

  const statusColors = {
    'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Acknowledged': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Assigned': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    'In Progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of civic issues and system performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className={`mr-1 h-3 w-3 ${
                  stat.trend === 'up' ? 'text-success' : 'text-warning'
                }`} />
                <span className={stat.trend === 'up' ? 'text-success' : 'text-warning'}>
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Issues */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Issues</CardTitle>
              <CardDescription>Latest reported civic issues requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{issue.title}</h4>
                        <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]} variant="secondary">
                          {issue.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>ID: {issue.id}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{issue.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{issue.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge className={statusColors[issue.status as keyof typeof statusColors]} variant="secondary">
                        {issue.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{issue.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">Create New Issue</div>
                <div className="text-sm text-muted-foreground">Report an issue on behalf of a citizen</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">Bulk Update Status</div>
                <div className="text-sm text-muted-foreground">Update multiple issues at once</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                <div className="font-medium text-foreground">Generate Report</div>
                <div className="text-sm text-muted-foreground">Create performance reports</div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium text-foreground">High Priority Backlog</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  12 high-priority issues pending assignment
                </p>
              </div>
              <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-foreground">Monthly Target Met</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Resolution target achieved this month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;