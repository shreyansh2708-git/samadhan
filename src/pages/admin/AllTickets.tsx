import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, MoreHorizontal, Calendar, MapPin, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for all tickets
const mockTickets = [
  {
    id: 'CR-2024-001',
    title: 'Pothole on Main Street',
    category: 'Pothole',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Road Maintenance Team',
    reporter: 'John Doe',
    location: '123 Main Street',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
  },
  {
    id: 'CR-2024-002',
    title: 'Broken Street Light',
    category: 'Street Light',
    priority: 'Medium',
    status: 'Assigned',
    assignee: 'Electrical Department',
    reporter: 'Jane Smith',
    location: '456 Oak Avenue',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
  },
  {
    id: 'CR-2024-003',
    title: 'Garbage Collection Missed',
    category: 'Garbage Collection',
    priority: 'Low',
    status: 'Resolved',
    assignee: 'Sanitation Department',
    reporter: 'Mike Johnson',
    location: '789 Pine Road',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-22',
  },
  {
    id: 'CR-2024-004',
    title: 'Traffic Signal Malfunction',
    category: 'Traffic Signal',
    priority: 'Critical',
    status: 'Acknowledged',
    assignee: 'Traffic Control',
    reporter: 'Sarah Wilson',
    location: 'Main St & 5th Ave',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
  },
  {
    id: 'CR-2024-005',
    title: 'Park Vandalism',
    category: 'Parks & Recreation',
    priority: 'Medium',
    status: 'Submitted',
    assignee: 'Parks Department',
    reporter: 'Tom Brown',
    location: 'Central Park',
    createdAt: '2024-01-23',
    updatedAt: '2024-01-23',
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
  'Closed': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
};

const AllTickets = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.reporter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase().replace(' ', '-') === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">All Tickets</h1>
        <p className="text-muted-foreground mt-2">
          Manage and track all civic issue reports in the system.
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
          <CardDescription>Filter and search through all tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, title, location, or reporter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTickets.length} of {mockTickets.length} tickets
        </p>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No tickets found matching your criteria
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{ticket.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]} variant="secondary">
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[ticket.status as keyof typeof statusColors]} variant="secondary">
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{ticket.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ticket.reporter}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{ticket.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{ticket.createdAt}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <User className="h-4 w-4 mr-2" />
                            Reassign
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllTickets;