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
  async getinviteeById(inviteeId: string): Promise<IInvitee | null> {
    return await this.inviteeRepository.findById(inviteeId);
  }
  // async updateCheckinStatus(id: string): Promise<IInvitee | null> {
  //   return await this.inviteeRepository.updateCheckinStatus(id);
  // }
  async updateCheckOutStatus(invitee: Omit<IInvitee, "id">, id: string): Promise<IInvitee | null> {
    return await this.inviteeRepository.updateCheckOutStatus(invitee, id);
  }
}
