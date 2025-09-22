import React, { useState } from 'react';
import { Calendar, MapPin, AlertCircle, CheckCircle, Clock, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Mock data for issues
const mockIssues = [
  {
    id: 'CR-2024-001',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing damage to vehicles',
    category: 'Pothole',
    status: 'In Progress',
    severity: 4,
    location: '123 Main Street',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    estimatedResolution: '2024-01-25',
  },
  {
    id: 'CR-2024-002',
    title: 'Broken Street Light',
    description: 'Street light has been out for a week',
    category: 'Street Light',
    status: 'Acknowledged',
    severity: 2,
    location: '456 Oak Avenue',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
    estimatedResolution: '2024-01-30',
  },
  {
    id: 'CR-2024-003',
    title: 'Garbage Collection Missed',
    description: 'Garbage not collected for two weeks',
    category: 'Garbage Collection',
    status: 'Resolved',
    severity: 3,
    location: '789 Pine Road',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22',
    estimatedResolution: '2024-01-22',
  },
];

const statusColors = {
  'Submitted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'Acknowledged': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  'Assigned': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  'In Progress': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  'Resolved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'Resolved':
    case 'Closed':
      return <CheckCircle className="h-4 w-4" />;
    case 'In Progress':
      return <Clock className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const MyIssues = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIssues = mockIssues.filter(issue => {
    const matchesStatus = statusFilter === 'all' || issue.status.toLowerCase() === statusFilter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">My Issues</h1>
        <p className="text-muted-foreground mt-2">
          Track the status of your reported civic issues.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your filters or search terms.'
                    : 'You haven\'t reported any issues yet.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>ID: {issue.id}</span>
                      <span>•</span>
                      <span>{issue.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`${statusColors[issue.status as keyof typeof statusColors]} flex items-center gap-1`}
                    >
                      <StatusIcon status={issue.status} />
                      {issue.status}
                    </Badge>
                    <Badge variant="outline">
                      Severity {issue.severity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{issue.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Reported: {issue.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Last Update: {issue.updatedAt}</span>
                  </div>
                  {issue.estimatedResolution && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4" />
                      <span>Est. Resolution: {issue.estimatedResolution}</span>
                    </div>
                  )}
                </div>

                {/* Status Timeline */}
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Status Progress</h4>
                  <div className="flex items-center space-x-2">
                    {['Submitted', 'Acknowledged', 'Assigned', 'In Progress', 'Resolved'].map((status, index) => {
                      const isCompleted = ['Submitted', 'Acknowledged', 'Assigned', 'In Progress', 'Resolved'].indexOf(issue.status) >= index;
                      const isCurrent = issue.status === status;
                      
                      return (
                        <React.Fragment key={status}>
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium ${
                            isCurrent 
                              ? 'bg-primary text-primary-foreground' 
                              : isCompleted 
                                ? 'bg-success text-success-foreground' 
                                : 'bg-muted text-muted-foreground'
                          }`}>
                            {isCompleted ? '✓' : index + 1}
                          </div>
                          {index < 4 && (
                            <div className={`flex-1 h-1 ${
                              isCompleted ? 'bg-success' : 'bg-muted'
                            }`} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MyIssues;