// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { Timestamp } from "firebase/firestore"

export type User = {
  id: number
  name: string
}

export type SmithProyect = {
  id: string
  createAt?: Timestamp
  updateAt?: Timestamp
  data?: string
  description?: string
  hashReference?: string
  isPubic?: boolean
  name?: string
  userId?: string
}
