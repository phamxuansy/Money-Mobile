import { IndexedEntity } from "./core-utils";
import type { Transaction } from "@shared/types";
export class TransactionEntity extends IndexedEntity<Transaction> {
  static readonly entityName = "transaction";
  static readonly indexName = "transactions";
  static readonly initialState: Transaction = {
    id: "",
    title: "",
    amount: 0,
    date: new Date().toISOString(),
    category: "Other",
  };
}