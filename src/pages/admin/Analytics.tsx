import React from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Analytics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Insights and trends from civic issue reporting data.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Issues by Category
              </CardTitle>
              <CardDescription>Distribution of reported issues across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Chart Placeholder</p>
                  <p className="text-xs text-muted-foreground">Bar chart showing issue categories</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Potholes</span>
                  <span className="font-medium">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Street Lights</span>
                  <span className="font-medium">22%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Garbage</span>
                  <span className="font-medium">18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Traffic</span>
                  <span className="font-medium">26%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Resolution Trends
              </CardTitle>
              <CardDescription>Average resolution time over the past months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Chart Placeholder</p>
                  <p className="text-xs text-muted-foreground">Line chart showing resolution trends</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-medium text-foreground">4.2 days</div>
                  <div className="text-muted-foreground">Current Avg</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-success">-12%</div>
                  <div className="text-muted-foreground">Improvement</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-foreground">3.8 days</div>
                  <div className="text-muted-foreground">Target</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Status Distribution
              </CardTitle>
              <CardDescription>Current status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <PieChart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Pie Chart</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open</span>
                  <span className="font-medium">26%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">In Progress</span>
                  <span className="font-medium">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolved</span>
                  <span className="font-medium">40%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Volume
              </CardTitle>
              <CardDescription>Issues reported per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Monthly Chart</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Month</span>
                  <span className="font-medium">76</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Change</span>
                  <span className="font-medium text-success">+17%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">First Response Time</span>
                  <span className="font-medium">2.3h</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Resolution Rate</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Citizen Satisfaction</span>
                  <span className="font-medium">4.6/5</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SLA Compliance</span>
                  <span className="font-medium">88%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Reports</CardTitle>
            <CardDescription>Generate comprehensive reports for stakeholders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span>Performance Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <TrendingUp className="h-6 w-6 mb-2" />
                <span>Trend Analysis</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <PieChart className="h-6 w-6 mb-2" />
                <span>Category Breakdown</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;