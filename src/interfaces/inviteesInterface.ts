export interface IInvitee {
  id: string;
  event_id: string;
  user_id: string;
  status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy';
  qr_code?: string;
  is_checked_in?: boolean;
  checked_in_at?: boolean;
  is_checked_out?: boolean; 
  checked_out_at?: Date; 
  created_at?: string;
  gift_money?: number;
}
export interface IInviteeWithoutId extends Omit<IInvitee, 'id' | 'created_at' | 'checked_in_at'> {
  event_id: string; 
  status: 'pending' | 'accept' | 'maybe' | 'no' | 'busy'; 
  qr_code: string;
  is_checked_in: boolean; 
  checked_in_at: Date | null;
}
  export interface IInviteeService {
    getAllInvitees(): Promise<IInvitee[]>;
    getInviteesByEventId(eventId: string): Promise<IInvitee[]>;
    getinviteeById(inviteeId: string): Promise<IInvitee | null>;
    updateInviteeStatus(inviteeId: string, status: string): Promise<IInvitee>;
    updateCheckInStatus(event_id: string, user_id:string): Promise<IInvitee>;
    createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee>;
    // updateCheckinStatus(id: string): Promise<IInvitee | null>;
    updateCheckOutStatus(invitee: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null>;
  }
  
  export interface IInviteeRepository {
    findAll(): Promise<IInvitee[]>;
    findByEventId(eventId: string): Promise<IInvitee[]>;
    findById(inviteeId: string): Promise<IInvitee | null>;
    updateStatus(inviteeId: string, status: string): Promise<IInvitee>;
    updateCheckInStatus(event_id: string, user_id:string): Promise<IInvitee>;
    create(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee>;
    updateCheckinStatus(id: string): Promise<IInvitee | null>;
    updateCheckOutStatus(invitee: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null>;
  }
  