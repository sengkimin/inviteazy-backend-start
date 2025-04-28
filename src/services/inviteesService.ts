import { IInvitee, IInviteeRepository, IInviteeService } from "../interfaces/inviteesInterface";

export class InviteeService implements IInviteeService {
  constructor(private inviteeRepository: IInviteeRepository) {}

  async createInvitee(invitee: Omit<IInvitee, "id" | "created_at">): Promise<IInvitee> {
    return await this.inviteeRepository.create(invitee);
  }

  async getAllInvitees(): Promise<IInvitee[]> {
    return await this.inviteeRepository.findAll();
  }

  async getInviteesByEventId(eventId: string): Promise<IInvitee[]> {
    return await this.inviteeRepository.findByEventId(eventId);
  }

  async updateInviteeStatus(inviteeId: string, status: string): Promise<IInvitee> {
    return await this.inviteeRepository.updateStatus(inviteeId, status);
  }

  async updateCheckInStatus(event_id: string, user_id:string): Promise<IInvitee> {
    return await this.inviteeRepository.updateCheckInStatus(event_id, user_id);
  }
}
