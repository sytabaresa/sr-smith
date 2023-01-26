// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

// import { Timestamp } from "firebase/firestore"

export type User = {
  id: number
  name: string
}

export type SmithProject = {
  id: string
  createdAt?: Time
  updatedAt?: Time
  data?: string
  description?: string
  hashReference?: string
  isPublic?: boolean
  name?: string
  userId?: string
}
