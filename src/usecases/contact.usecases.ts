import {
  ContactCreate,
  ContactsRepository,
} from "../interfaces/contacts.interface";
import { ContactsRepositoryPrisma } from "../repositories/contacts.repositories";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class ContactUseCase {
  private contactRepository: ContactsRepository;
  private userRepository: UserRepositoryPrisma;
  constructor() {
    this.contactRepository = new ContactsRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ email, name, phone, userEmail }: ContactCreate) {
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new Error("User not found");
    }
    const verifyIfExistsContact =
      await this.contactRepository.findByEmailOrPhone(email, phone);
    if (verifyIfExistsContact) {
      throw new Error("Contact already exists");
    }
    const contact = await this.contactRepository.create({
      name,
      email,
      phone,
      userId: user.id,
    })
  }
}

export { ContactUseCase };
