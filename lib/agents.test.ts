import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

const AGENTS_DDL = `
  CREATE TABLE agents (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    name                  TEXT    NOT NULL,
    model                 TEXT    NOT NULL DEFAULT '',
    presenting_complaints TEXT    NOT NULL DEFAULT '',
    status                TEXT    NOT NULL DEFAULT 'active'
                            CHECK (status IN ('active', 'inactive')),
    created_at            TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`;

describe('lib/agents', () => {
  let tmpDir: string;

  beforeEach(async () => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-agents-'));
    fs.mkdirSync(path.join(tmpDir, 'data'), { recursive: true });
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
    const { getDb } = await import('@/db/client');
    getDb().exec(AGENTS_DDL);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('getAllAgents', () => {
    it('returns empty array when no agents exist', async () => {
      const { getAllAgents } = await import('./agents');
      expect(getAllAgents()).toEqual([]);
    });

    it('returns all agents', async () => {
      const { getAllAgents, createAgent } = await import('./agents');
      createAgent({ name: 'Alpha', model: '', presenting_complaints: '' });
      createAgent({ name: 'Beta', model: '', presenting_complaints: '' });
      expect(getAllAgents()).toHaveLength(2);
    });

    it('orders active agents before inactive ones', async () => {
      const { getAllAgents, createAgent, deactivateAgent } = await import('./agents');
      const a = createAgent({ name: 'Active', model: '', presenting_complaints: '' });
      const b = createAgent({ name: 'Inactive', model: '', presenting_complaints: '' });
      deactivateAgent(b.id);
      const agents = getAllAgents();
      expect(agents[0].id).toBe(a.id);
      expect(agents[1].id).toBe(b.id);
    });
  });

  describe('getAgentById', () => {
    it('returns the agent when found', async () => {
      const { createAgent, getAgentById } = await import('./agents');
      const created = createAgent({ name: 'Test', model: 'gpt-4', presenting_complaints: 'none' });
      const found = getAgentById(created.id);
      expect(found).not.toBeNull();
      expect(found?.name).toBe('Test');
      expect(found?.model).toBe('gpt-4');
    });

    it('returns null when agent does not exist', async () => {
      const { getAgentById } = await import('./agents');
      expect(getAgentById(9999)).toBeNull();
    });
  });

  describe('createAgent', () => {
    it('inserts an agent and returns it with an id', async () => {
      const { createAgent } = await import('./agents');
      const agent = createAgent({
        name: 'Anxious Llama',
        model: 'claude-sonnet-4-6',
        presenting_complaints: 'token anxiety',
      });
      expect(agent.id).toBeGreaterThan(0);
      expect(agent.name).toBe('Anxious Llama');
      expect(agent.model).toBe('claude-sonnet-4-6');
      expect(agent.presenting_complaints).toBe('token anxiety');
    });

    it('defaults status to active', async () => {
      const { createAgent } = await import('./agents');
      const agent = createAgent({ name: 'New', model: '', presenting_complaints: '' });
      expect(agent.status).toBe('active');
    });

    it('sets created_at automatically', async () => {
      const { createAgent } = await import('./agents');
      const agent = createAgent({ name: 'Timestamped', model: '', presenting_complaints: '' });
      expect(agent.created_at).toBeTruthy();
    });
  });

  describe('updateAgent', () => {
    it('updates specified fields', async () => {
      const { createAgent, updateAgent } = await import('./agents');
      const agent = createAgent({ name: 'Old Name', model: 'old', presenting_complaints: '' });
      const updated = updateAgent(agent.id, { name: 'New Name', model: 'new' });
      expect(updated?.name).toBe('New Name');
      expect(updated?.model).toBe('new');
    });

    it('leaves unspecified fields unchanged', async () => {
      const { createAgent, updateAgent } = await import('./agents');
      const agent = createAgent({ name: 'Keep', model: 'keep-model', presenting_complaints: 'keep-complaints' });
      updateAgent(agent.id, { name: 'Changed' });
      const { getAgentById } = await import('./agents');
      const result = getAgentById(agent.id);
      expect(result?.model).toBe('keep-model');
      expect(result?.presenting_complaints).toBe('keep-complaints');
    });

    it('returns null for a non-existent agent', async () => {
      const { updateAgent } = await import('./agents');
      expect(updateAgent(9999, { name: 'Ghost' })).toBeNull();
    });
  });

  describe('deactivateAgent', () => {
    it('sets status to inactive', async () => {
      const { createAgent, deactivateAgent, getAgentById } = await import('./agents');
      const agent = createAgent({ name: 'Active', model: '', presenting_complaints: '' });
      deactivateAgent(agent.id);
      expect(getAgentById(agent.id)?.status).toBe('inactive');
    });

    it('does not affect other agents', async () => {
      const { createAgent, deactivateAgent, getAgentById } = await import('./agents');
      const a = createAgent({ name: 'A', model: '', presenting_complaints: '' });
      const b = createAgent({ name: 'B', model: '', presenting_complaints: '' });
      deactivateAgent(a.id);
      expect(getAgentById(b.id)?.status).toBe('active');
    });
  });
});
