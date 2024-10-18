"use client";

import { useState } from 'react';
import WorkOrderList from '@/components/WorkOrderList';
import { WorkOrder } from '@/types/workOrder';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';

const workOrders: WorkOrder[] = [
  { id: 1, title: 'Apply Organic Herbicide', status: 'pending', sector: 'Sector-3', startDate: '2023-06-01', endDate: '2023-06-07' },
  { id: 2, title: 'Distribute Nitrogen-Rich Fertilizer', status: 'in progress', sector: 'Sector-3', startDate: '2023-06-03', endDate: '2023-06-10' },
  { id: 3, title: 'Install Drip Irrigation System', status: 'completed', sector: 'Sector-3', startDate: '2023-05-25', endDate: '2023-06-05' },
  { id: 4, title: 'Prune Fruit Trees', status: 'pending', sector: 'Sector-3', startDate: '2023-06-08', endDate: '2023-06-15' },
  { id: 5, title: 'Apply Foliar Nutrient Spray', status: 'in progress', sector: 'Sector-3', startDate: '2023-06-05', endDate: '2023-06-12' },
  { id: 6, title: 'Implement Crop Rotation Plan', status: 'pending', sector: 'Sector-3', startDate: '2024-09-01', endDate: '2024-10-15' },
  { id: 7, title: 'Soil pH Adjustment', status: 'completed', sector: 'Sector-3', startDate: '2023-05-20', endDate: '2023-05-30' },
  { id: 8, title: 'Install Pollinator Gardens', status: 'in progress', sector: 'Sector-3', startDate: '2023-06-10', endDate: '2023-06-25' },
  { id: 9, title: 'Implement Integrated Pest Management', status: 'pending', sector: 'Sector-3', startDate: '2023-06-15', endDate: '2023-07-15' },
  { id: 10, title: 'Harvest Summer Crops', status: 'pending', sector: 'Sector-2', startDate: '2023-07-01', endDate: '2023-07-15' },
  { id: 11, title: 'Repair Greenhouse Structure', status: 'in progress', sector: 'Sector-1', startDate: '2023-06-20', endDate: '2023-07-05' },
  { id: 12, title: 'Plant Cover Crops', status: 'pending', sector: 'Sector-4', startDate: '2023-08-01', endDate: '2023-08-10' },
  { id: 13, title: 'Calibrate Irrigation System', status: 'completed', sector: 'Sector-2', startDate: '2023-05-15', endDate: '2023-05-20' },
  { id: 14, title: 'Conduct Soil Testing', status: 'in progress', sector: 'Sector-1', startDate: '2023-06-25', endDate: '2023-07-10' },
  { id: 15, title: 'Install New Compost Bins', status: 'pending', sector: 'Sector-4', startDate: '2023-07-05', endDate: '2023-07-20' },
  { id: 16, title: 'Prune Berry Bushes', status: 'completed', sector: 'Sector-2', startDate: '2023-05-10', endDate: '2023-05-18' },
  { id: 17, title: 'Set Up Vertical Growing Systems', status: 'in progress', sector: 'Sector-1', startDate: '2023-06-15', endDate: '2023-07-01' },
  { id: 18, title: 'Implement Water Conservation Measures', status: 'pending', sector: 'Sector-3', startDate: '2023-07-10', endDate: '2023-08-10' },
  { id: 19, title: 'Plant Fall Vegetables', status: 'pending', sector: 'Sector-2', startDate: '2023-08-15', endDate: '2023-08-30' },
  { id: 20, title: 'Maintain Beehives', status: 'in progress', sector: 'Sector-4', startDate: '2023-06-01', endDate: '2023-09-30' },
  { id: 21, title: 'Harvest and Process Herbs', status: 'pending', sector: 'Sector-1', startDate: '2023-07-15', endDate: '2023-07-25' },
  { id: 22, title: 'Prepare Winter Protection for Plants', status: 'pending', sector: 'Sector-3', startDate: '2023-09-15', endDate: '2023-10-15' },
  { id: 23, title: 'Implement New Crop Varieties', status: 'in progress', sector: 'Sector-2', startDate: '2023-06-10', endDate: '2023-07-10' },
  { id: 24, title: 'Maintain Farm Equipment', status: 'completed', sector: 'Sector-4', startDate: '2023-05-01', endDate: '2023-05-15' },
  { id: 25, title: 'Set Up Rainwater Harvesting System', status: 'pending', sector: 'Sector-1', startDate: '2023-07-20', endDate: '2023-08-20' },
  { id: 26, title: 'Implement Organic Pest Control', status: 'in progress', sector: 'Sector-3', startDate: '2023-06-05', endDate: '2023-08-05' },
  { id: 27, title: 'Prepare and Plant New Orchard', status: 'pending', sector: 'Sector-2', startDate: '2023-09-01', endDate: '2023-10-15' },
  { id: 28, title: 'Install Solar Panels for Farm Operations', status: 'pending', sector: 'Sector-4', startDate: '2023-08-01', endDate: '2023-09-15' },
  { id: 29, title: 'Implement Crop Monitoring Technology', status: 'in progress', sector: 'Sector-1', startDate: '2023-06-15', endDate: '2023-07-30' },
  { id: 30, title: 'Conduct Annual Soil Health Assessment', status: 'pending', sector: 'Sector-3', startDate: '2023-10-01', endDate: '2023-10-31' }
];

export default function Home() {
  const [filteredOrders, setFilteredOrders] = useState(workOrders);
  const [statusFilter, setStatusFilter] = useState('all');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filterOrders = () => {
    let filtered = workOrders;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (startDateFilter) {
      filtered = filtered.filter(order => order.startDate >= startDateFilter);
    }

    if (endDateFilter) {
      filtered = filtered.filter(order => order.endDate <= endDateFilter);
    }

    setFilteredOrders(filtered);
  };

  return (
    <div className="container mx-auto px-2 py-4 relative">
      <div className="fixed top-4 left-4 z-10 flex space-x-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setViewMode('grid')}
          aria-label="Grid View"
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'table' ? 'default' : 'outline'}
          size="icon"
          onClick={() => setViewMode('table')}
          aria-label="Table View"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Plant Care Work Orders</h1>
      
      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <div>
          <Label htmlFor="status-filter" className="mb-1 block text-sm">Status</Label>
          <Select onValueChange={(value) => { setStatusFilter(value); filterOrders(); }}>
            <SelectTrigger id="status-filter">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="start-date" className="mb-1 block text-sm">From</Label>
          <Input
            id="start-date"
            type="date"
            className="text-sm"
            onChange={(e) => { setStartDateFilter(e.target.value); filterOrders(); }}
          />
        </div>
        
        <div>
          <Label htmlFor="end-date" className="mb-1 block text-sm">To</Label>
          <Input
            id="end-date"
            type="date"
            className="text-sm"
            onChange={(e) => { setEndDateFilter(e.target.value); filterOrders(); }}
          />
        </div>
      </div>
      
      <WorkOrderList workOrders={filteredOrders} viewMode={viewMode} />
    </div>
  );
}