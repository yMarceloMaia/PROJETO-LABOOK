import { v4 } from 'uuid'

export class IdGeneration {
  generateId(): string {
    return v4();
  }
}