import { Hono } from "hono";
import type { Env } from './core-utils';
import { TransactionEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
import { Transaction, TransactionCreatePayload, TransactionUpdatePayload } from "@shared/types";
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  // GET all transactions with optional date filtering
  app.get('/api/transactions', async (c) => {
    const { items } = await TransactionEntity.list(c.env);
    const startDate = c.req.query('startDate');
    const endDate = c.req.query('endDate');
    let filteredItems = items;
    if (isStr(startDate) && isStr(endDate)) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredItems = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }
    filteredItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return ok(c, filteredItems);
  });
  // POST a new transaction
  app.post('/api/transactions', async (c) => {
    const payload = await c.req.json<TransactionCreatePayload>();
    if (!payload.title || !payload.amount || !payload.category || !payload.date) {
      return bad(c, 'Missing required fields');
    }
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...payload,
    };
    const created = await TransactionEntity.create(c.env, newTransaction);
    return ok(c, created);
  });
  // PUT (update) an existing transaction
  app.put('/api/transactions/:id', async (c) => {
    const id = c.req.param('id');
    const payload = await c.req.json<TransactionUpdatePayload>();
    const entity = new TransactionEntity(c.env, id);
    if (!(await entity.exists())) {
      return notFound(c, 'Transaction not found');
    }
    await entity.patch(payload);
    const updatedTransaction = await entity.getState();
    return ok(c, updatedTransaction);
  });
  // DELETE a transaction
  app.delete('/api/transactions/:id', async (c) => {
    const id = c.req.param('id');
    const existed = await TransactionEntity.delete(c.env, id);
    if (!existed) {
      return notFound(c, 'Transaction not found');
    }
    return ok(c, { id });
  });
}