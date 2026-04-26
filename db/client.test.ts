import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('runMigrations', () => {
  let tmpDir: string;

  beforeEach(() => {
    vi.resetModules();
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentclinic-test-'));
    fs.mkdirSync(path.join(tmpDir, 'db', 'migrations'), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, 'db', 'migrations', '0001_test.sql'),
      'CREATE TABLE test_table (id INTEGER PRIMARY KEY);',
    );
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('creates the database file on first run', async () => {
    const { runMigrations } = await import('./client');
    runMigrations();
    expect(fs.existsSync(path.join(tmpDir, 'data', 'agentclinic.db'))).toBe(true);
  });

  it('records applied migrations in _migrations table', async () => {
    const { runMigrations, getDb } = await import('./client');
    runMigrations();
    const rows = getDb().prepare('SELECT name FROM _migrations ORDER BY name').all();
    expect(rows).toEqual([{ name: '0001_test.sql' }]);
  });

  it('executes the SQL in migration files', async () => {
    const { runMigrations, getDb } = await import('./client');
    runMigrations();
    const tables = getDb()
      .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='test_table'`)
      .all();
    expect(tables).toHaveLength(1);
  });

  it('does not re-apply migrations on subsequent runs (idempotent)', async () => {
    const { runMigrations, getDb } = await import('./client');
    runMigrations();
    runMigrations();
    const rows = getDb().prepare('SELECT name FROM _migrations').all();
    expect(rows).toHaveLength(1);
  });

  it('applies multiple migrations in filename order', async () => {
    fs.writeFileSync(
      path.join(tmpDir, 'db', 'migrations', '0002_add_column.sql'),
      'ALTER TABLE test_table ADD COLUMN label TEXT;',
    );
    const { runMigrations, getDb } = await import('./client');
    runMigrations();
    const rows = getDb()
      .prepare('SELECT name FROM _migrations ORDER BY name')
      .all() as { name: string }[];
    expect(rows.map((r) => r.name)).toEqual(['0001_test.sql', '0002_add_column.sql']);
  });

  it('skips empty migration files without error', async () => {
    fs.writeFileSync(
      path.join(tmpDir, 'db', 'migrations', '0002_empty.sql'),
      '   \n  ',
    );
    const { runMigrations, getDb } = await import('./client');
    expect(() => runMigrations()).not.toThrow();
    const rows = getDb().prepare('SELECT name FROM _migrations ORDER BY name').all();
    expect(rows).toHaveLength(2);
  });
});
