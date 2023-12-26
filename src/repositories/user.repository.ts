import { User, UserRepository } from "../interfaces/users.interface";

class UserRepositoryPrisma  implements UserRepository{
  async create(data: User): Promise<User> {
    
  }
}

export { UserRepositoryPrisma }