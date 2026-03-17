CREATE TABLE IF NOT EXISTS p_a2bbd1f4_tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text,
  status varchar(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  priority varchar(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE p_a2bbd1f4_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access" ON p_a2bbd1f4_tasks FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_p_a2bbd1f4_tasks_status ON p_a2bbd1f4_tasks(status);
CREATE INDEX IF NOT EXISTS idx_p_a2bbd1f4_tasks_priority ON p_a2bbd1f4_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_p_a2bbd1f4_tasks_due_date ON p_a2bbd1f4_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_p_a2bbd1f4_tasks_created_at ON p_a2bbd1f4_tasks(created_at);