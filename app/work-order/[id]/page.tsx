"use client";

import { useParams, useRouter } from 'next/navigation';
import { WorkOrder } from '@/types/workOrder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle, AlertCircle } from 'lucide-react';
import { format, isBefore, isAfter, addDays } from 'date-fns';

const workOrders: WorkOrder[] = [
  // ... (keep the existing work orders array)
];

const statusColors = {
  pending: 'bg-red-100 text-red-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

export default function WorkOrderDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const workOrder = workOrders.find(order => order.id === id);

  if (!workOrder) {
    return <div className="container mx-auto px-4 py-8 text-center">Work order not found</div>;
  }

  const today = new Date();
  const endDate = new Date(workOrder.endDate);
  const isOverdue = isBefore(endDate, today) && workOrder.status !== 'completed';
  const isApproaching = isBefore(endDate, addDays(today, 2)) && workOrder.status !== 'completed';

  const getStatusInfo = () => {
    if (isOverdue) {
      return { icon: <AlertCircle className="text-red-500" size={24} />, bgColor: 'bg-red-50' };
    } else if (isApproaching) {
      return { icon: <AlertTriangle className="text-yellow-500" size={24} />, bgColor: 'bg-yellow-50' };
    }
    return { icon: null, bgColor: '' };
  };

  const { icon, bgColor } = getStatusInfo();

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="outline" className="mb-4 w-full sm:w-auto" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className={bgColor}>
        <CardHeader className="relative">
          <CardTitle className="text-xl sm:text-2xl pr-8">{workOrder.title}</CardTitle>
          {icon && <div className="absolute top-4 right-4">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <Badge className={`${statusColors[workOrder.status]} mb-2 sm:mb-0`}>
              {workOrder.status}
            </Badge>
            <span className="text-sm text-gray-500">{workOrder.sector}</span>
          </div>
          <div className="mb-4 space-y-1">
            <p className="text-sm text-gray-600">From: <span className="font-medium">{format(new Date(workOrder.startDate), 'MMMM d, yyyy')}</span></p>
            <p className="text-sm text-gray-600">To: <span className="font-medium">{format(new Date(workOrder.endDate), 'MMMM d, yyyy')}</span></p>
          </div>
          <p className="text-gray-700">
            This work order involves plant care tasks related to {workOrder.title.toLowerCase()}. 
            Please ensure all safety protocols are followed and use appropriate equipment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}