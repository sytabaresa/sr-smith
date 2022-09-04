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
  createAt?: Timestamp
  updateAt?: Timestamp
  data?: String
  description?: String
  hashReference?: String
  isPubic?: boolean
  name?: String
  userId?: String
}
