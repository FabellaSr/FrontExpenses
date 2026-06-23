import { SharedFund} from '@/interfaces';
import { api } from './api';
import { SharedFundBreakdown } from '@/pages/shared-funds';


export const sharedFundsService = {
  list: () =>
    api.get<SharedFund[]>('/shared-funds').then((r) => r.data),

  current: ( year: number,month: number, ) =>
    api.get<SharedFund>('/shared-funds/current',{params: { year, month, },},).then((r) => r.data),
 
  breakdown: ( year: number, month: number,) =>
    api.get<SharedFundBreakdown>(`/shared-funds/${year}/${month}/breakdown`,).then((r) => r.data),

  create: (body: { year: number; month: number; targetAmount: number;}) => 
    api.post('/shared-funds/', body).then((r) => r.data),

  update: ( id: number, body: Partial<{ year: number; month: number; targetAmount: number;
    }>,) =>
    api.patch(`/shared-funds/${id}`, body).then((r) => r.data),

  remove: (id: number) => 
    api.delete(`/shared-funds/${id}`).then((r) => r.data),
};