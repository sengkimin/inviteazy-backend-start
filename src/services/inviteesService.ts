import { IInvitee, IInviteeRepository, IInviteeService } from "../interfaces/inviteesInterface";

export class InviteeService implements IInviteeService {
  constructor(private inviteeRepository: IInviteeRepository) {}
  getinviteeById(inviteeId: string): Promise<IInvitee | null> {
    throw new Error("Method not implemented.");
  }

  async getInviteeById(inviteeId: string): Promise<IInvitee | null> {
    return this.inviteeRepository.findById(inviteeId);
  }


  async createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    return this.inviteeRepository.create(invitee);
  }

  async getAllInvitees(): Promise<IInvitee[]> {
    return this.inviteeRepository.findAll();
  }

  async getInviteesByEventId(eventId: string): Promise<IInvitee[]> {
    return this.inviteeRepository.findByEventId(eventId);
  }

  async updateInviteeStatus(inviteeId: string, status: string): Promise<IInvitee> {
    return this.inviteeRepository.updateStatus(inviteeId, status);
  }

  async updateCheckOutStatus(invitee: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null> {
    return await this.inviteeRepository.updateCheckOutStatus(invitee, id);}

  async updateCheckInStatus(event_id: string, user_id:string): Promise<IInvitee> {
    return await this.inviteeRepository.updateCheckInStatus(event_id, user_id);
  }
}
