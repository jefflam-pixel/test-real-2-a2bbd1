CREATE TABLE IF NOT EXISTS p_a2bbd1f4_task_prioritization (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text,
  priority_level varchar(20) DEFAULT 'Medium' CHECK (priority_level IN ('Low', 'Medium', 'High')),
  urgency varchar(20) DEFAULT 'Normal' CHECK (urgency IN ('Low', 'Normal', 'Urgent')),
  importance varchar(20) DEFAULT 'Normal' CHECK (importance IN ('Low', 'Normal', 'High')),
  status varchar(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Completed', 'On Hold')),
  estimated_hours decimal(4,1) DEFAULT 1.0,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE p_a2bbd1f4_task_prioritization ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access" ON p_a2bbd1f4_task_prioritization FOR ALL USING (true) WITH CHECK (true);