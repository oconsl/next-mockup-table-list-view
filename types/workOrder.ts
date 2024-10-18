export interface WorkOrder {
  id: number;
  title: string;
  status: 'pending' | 'in progress' | 'completed';
  sector: string;
  startDate: string;
  endDate: string;
}