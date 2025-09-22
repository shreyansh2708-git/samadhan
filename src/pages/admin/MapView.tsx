import React, { useState } from 'react';
import { Map, MapPin, Filter, Layers, Search, Maximize } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

// Mock map data for issues
const mockMapIssues = [
  {
    id: 'CR-2024-001',
    title: 'Pothole on Main Street',
    category: 'Pothole',
    priority: 'High',
    status: 'In Progress',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    address: '123 Main Street',
  },
  {
    id: 'CR-2024-002',
    title: 'Broken Street Light',
    category: 'Street Light',
    priority: 'Medium',
    status: 'Assigned',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    address: '456 Oak Avenue',
  },
  {
    id: 'CR-2024-004',
    title: 'Traffic Signal Malfunction',
    category: 'Traffic Signal',
    priority: 'Critical',
    status: 'Acknowledged',
    coordinates: { lat: 40.7505, lng: -73.9934 },
    address: 'Main St & 5th Ave',
  },
  {
    id: 'CR-2024-005',
    title: 'Park Vandalism',
    category: 'Parks & Recreation',
    priority: 'Medium',
    status: 'Submitted',
    coordinates: { lat: 40.7549, lng: -73.9840 },
    address: 'Central Park',
  },
];

const priorityColors = {
  'Critical': 'bg-destructive',
  'High': 'bg-warning',
  'Medium': 'bg-primary',
  'Low': 'bg-muted',
};

const statusColors = {
  'Submitted': 'border-blue-500',
  'Acknowledged': 'border-yellow-500',
  'Assigned': 'border-purple-500',
  'In Progress': 'border-orange-500',
  'Resolved': 'border-green-500',
};

const MapView = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState('');

  const filteredIssues = mockMapIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;
    const matchesSearch = searchLocation === '' || 
      issue.address.toLowerCase().includes(searchLocation.toLowerCase()) ||
      issue.title.toLowerCase().includes(searchLocation.toLowerCase());
    
    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Map View</h1>
        <p className="text-muted-foreground mt-2">
          Visual overview of civic issues by location across the city.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Map Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Search Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search address..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Pothole">Pothole</SelectItem>
                    <SelectItem value="Street Light">Street Light</SelectItem>
                    <SelectItem value="Traffic Signal">Traffic Signal</SelectItem>
                    <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    <SelectItem value="Garbage Collection">Garbage Collection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Priority</label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <span>Critical Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <span>High Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span>Medium Priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <span>Low Priority</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Issue Markers</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Heat Map</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">District Boundaries</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Traffic Overlay</span>
              </label>
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  City Issues Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Showing {filteredIssues.length} issues
                  </span>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full">
              {/* Interactive Map Placeholder */}
              <div className="w-full h-full bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/25 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Interactive Map</h3>
                    <p className="text-sm text-muted-foreground">
                      This would show an interactive map with issue markers
                    </p>
                  </div>
                </div>

                {/* Simulated Map Markers */}
                <div className="absolute inset-0">
                  {filteredIssues.map((issue, index) => (
                    <div
                      key={issue.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                        selectedIssue === issue.id ? 'z-10' : 'z-0'
                      }`}
                      style={{
                        left: `${20 + (index * 15) % 60}%`,
                        top: `${30 + (index * 12) % 40}%`,
                      }}
                      onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                    >
                      <div className={`w-4 h-4 rounded-full ${priorityColors[issue.priority as keyof typeof priorityColors]} border-2 ${statusColors[issue.status as keyof typeof statusColors]} shadow-md hover:scale-110 transition-transform`}></div>
                      
                      {selectedIssue === issue.id && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg p-3 min-w-[200px]">
                          <div className="text-sm font-medium text-foreground">{issue.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{issue.address}</div>
                          <div className="flex items-center gap-1 mt-2">
                            <Badge 
                              className={`${priorityColors[issue.priority as keyof typeof priorityColors]} text-white`}
                              variant="secondary"
                            >
                              {issue.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {issue.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            ID: {issue.id}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="bg-card">
                    +
                  </Button>
                  <Button variant="outline" size="sm" className="bg-card">
                    -
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issue Summary */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtered Issues Summary</CardTitle>
            <CardDescription>Quick overview of currently visible issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredIssues.map((issue) => (
                <div 
                  key={issue.id} 
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedIssue === issue.id ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm text-foreground">{issue.title}</h4>
                    <div className={`w-3 h-3 rounded-full ${priorityColors[issue.priority as keyof typeof priorityColors]}`}></div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{issue.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {issue.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {issue.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapView;