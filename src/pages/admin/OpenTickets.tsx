import React, { useState } from 'react';
import { AlertTriangle, Clock, User, MapPin, Calendar, CheckSquare, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock data for open tickets
const mockOpenTickets = [
  {
    id: 'CR-2024-004',
    title: 'Traffic Signal Malfunction',
    description: 'Traffic light at main intersection is stuck on red, causing major delays',
    category: 'Traffic Signal',
    priority: 'Critical',
    status: 'Acknowledged',
    assignee: 'Traffic Control',
    reporter: 'Sarah Wilson',
    reporterContact: 'sarah.w@email.com',
    location: 'Main St & 5th Ave',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    estimatedHours: 4,
    tags: ['urgent', 'traffic'],
  },
  {
    id: 'CR-2024-001',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing damage to vehicles near the shopping center',
    category: 'Pothole',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Road Maintenance Team',
    reporter: 'John Doe',
    reporterContact: 'john.doe@email.com',
    location: '123 Main Street',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    estimatedHours: 8,
    tags: ['road', 'maintenance'],
  },
  {
    id: 'CR-2024-002',
    title: 'Broken Street Light',
    description: 'Street light has been out for a week, creating safety concerns',
    category: 'Street Light',
    priority: 'Medium',
    status: 'Assigned',
    assignee: 'Electrical Department',
    reporter: 'Jane Smith',
    reporterContact: 'jane.smith@email.com',
    location: '456 Oak Avenue',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19',
    estimatedHours: 2,
    tags: ['lighting', 'safety'],
  },
  {
    id: 'CR-2024-005',
    title: 'Park Vandalism',
    description: 'Graffiti on playground equipment and broken bench',
    category: 'Parks & Recreation',
    priority: 'Medium',
    status: 'Submitted',
    assignee: 'Parks Department',
    reporter: 'Tom Brown',
    reporterContact: 'tom.brown@email.com',
    location: 'Central Park',
    createdAt: '2024-01-23',
    updatedAt: '2024-01-23',
    estimatedHours: 6,
    tags: ['parks', 'vandalism'],
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
};

const OpenTickets = () => {
  const [sortBy, setSortBy] = useState('priority');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const { toast } = useToast();

  const sortedTickets = [...mockOpenTickets].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const updateTicketStatus = (ticketId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Ticket ${ticketId} status changed to ${newStatus}`,
    });
  };

  const assignTicket = (ticketId: string, assignee: string) => {
    toast({
      title: "Ticket Assigned",
      description: `Ticket ${ticketId} assigned to ${assignee}`,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Open Tickets</h1>
            <p className="text-muted-foreground mt-2">
              Manage and prioritize unresolved civic issues ({sortedTickets.length} open)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <CheckSquare className="h-4 w-4 mr-2" />
              Bulk Actions
            </Button>
          </div>
        </div>
      </div>

      {/* Priority Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {['Critical', 'High', 'Medium', 'Low'].map((priority) => {
          const count = sortedTickets.filter(t => t.priority === priority).length;
          return (
            <Card key={priority}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{priority} Priority</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <AlertTriangle className={`h-8 w-8 ${
                    priority === 'Critical' ? 'text-destructive' :
                    priority === 'High' ? 'text-warning' :
                    priority === 'Medium' ? 'text-primary' :
                    'text-muted-foreground'
                  }`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Open Tickets List */}
      <div className="space-y-4">
        {sortedTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{ticket.title}</h3>
                    <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]} variant="secondary">
                      {ticket.priority}
                    </Badge>
                    <Badge className={statusColors[ticket.status as keyof typeof statusColors]} variant="secondary">
                      {ticket.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>ID: {ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                    <span>•</span>
                    <span>Est. {ticket.estimatedHours}h</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select onValueChange={(value) => updateTicketStatus(ticket.id, value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acknowledged">Mark Acknowledged</SelectItem>
                      <SelectItem value="Assigned">Mark Assigned</SelectItem>
                      <SelectItem value="In Progress">Start Progress</SelectItem>
                      <SelectItem value="Resolved">Mark Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedTicket(selectedTicket === ticket.id ? null : ticket.id)}
                  >
                    {selectedTicket === ticket.id ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>
              </div>

              <p className="text-foreground mb-4">{ticket.description}</p>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{ticket.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Assigned: {ticket.assignee}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {ticket.createdAt}</span>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedTicket === ticket.id && (
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Reporter Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="text-foreground">{ticket.reporter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contact:</span>
                          <span className="text-foreground">{ticket.reporterContact}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Update:</span>
                          <span className="text-foreground">{ticket.updatedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Assignment & Tags</h4>
                      <div className="space-y-3">
                        <div>
                          <Select onValueChange={(value) => assignTicket(ticket.id, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Reassign Ticket" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Road Maintenance Team">Road Maintenance Team</SelectItem>
                              <SelectItem value="Electrical Department">Electrical Department</SelectItem>
                              <SelectItem value="Traffic Control">Traffic Control</SelectItem>
                              <SelectItem value="Parks Department">Parks Department</SelectItem>
                              <SelectItem value="Sanitation Department">Sanitation Department</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Tags:</p>
                          <div className="flex gap-2">
                            {ticket.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Contact Reporter
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity">
                      Take Action
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedTickets.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Open Tickets</h3>
              <p className="text-muted-foreground">
                All civic issues have been resolved! Great work.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OpenTickets;