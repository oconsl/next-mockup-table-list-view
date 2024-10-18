"use client";

import { WorkOrder } from '@/types/workOrder';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { format, isBefore, addDays } from 'date-fns';

interface WorkOrderListProps {
  workOrders: WorkOrder[];
  viewMode: 'grid' | 'table';
}

const statusColors = {
  pending: 'bg-red-100 text-red-800',
  'in progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

export default function WorkOrderList({ workOrders, viewMode }: WorkOrderListProps) {
  const today = new Date();

  const getStatusInfo = (order: WorkOrder) => {
    const endDate = new Date(order.endDate);
    if (order.status !== 'completed') {
      if (isBefore(endDate, today)) {
        return { icon: <AlertCircle className="text-red-500" size={16} />, bgColor: 'bg-red-50' };
      } else if (isBefore(endDate, addDays(today, 2))) {
        return { icon: <AlertTriangle className="text-yellow-500" size={16} />, bgColor: 'bg-yellow-50' };
      }
    }
    return { icon: null, bgColor: '' };
  };

  const renderGridView = () => (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {workOrders.map((order) => {
        const { icon, bgColor } = getStatusInfo(order);
        return (
          <Link href={`/work-order/${order.id}`} key={order.id} className="block">
            <div className={`p-2 border rounded-md hover:shadow-md transition-shadow duration-300 touch-manipulation ${bgColor}`}>
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-sm font-semibold truncate flex-grow mr-2">{order.title}</h2>
                {icon}
              </div>
              <div className="flex justify-between items-center mb-1">
                <Badge className={`${statusColors[order.status]} text-xs px-1 py-0`}>
                  {order.status}
                </Badge>
                <span className="text-xs text-gray-500">{order.sector}</span>
              </div>
              <div className="text-xs text-gray-600">
                <p>{format(new Date(order.startDate), 'MMM d')} - {format(new Date(order.endDate), 'MMM d, yyyy')}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Sector</th>
            <th className="p-2 text-left">Start Date</th>
            <th className="p-2 text-left">End Date</th>
          </tr>
        </thead>
        <tbody>
          {workOrders.map((order) => {
            const { icon, bgColor } = getStatusInfo(order);
            return (
              <tr key={order.id} className={`border-b hover:bg-gray-50 ${bgColor}`}>
                <td className="p-2">
                  <Link href={`/work-order/${order.id}`} className="flex items-center">
                    <span className="font-semibold mr-2">{order.title}</span>
                    {icon}
                  </Link>
                </td>
                <td className="p-2">
                  <Badge className={`${statusColors[order.status]} text-xs px-1 py-0`}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-2 text-sm">{order.sector}</td>
                <td className="p-2 text-sm">{format(new Date(order.startDate), 'MMM d, yyyy')}</td>
                <td className="p-2 text-sm">{format(new Date(order.endDate), 'MMM d, yyyy')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="transition-all duration-300 ease-in-out">
      {viewMode === 'grid' ? renderGridView() : renderTableView()}
    </div>
  );
}