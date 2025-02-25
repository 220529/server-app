import { NotFoundException, ConflictException } from "@nestjs/common";

export class UserNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`User with ID ${id} not found`);
  }
}

export class UsernameAlreadyExistsException extends ConflictException {
  constructor(username: string) {
    super(`Username "${username}" already exists`);
  }
}
