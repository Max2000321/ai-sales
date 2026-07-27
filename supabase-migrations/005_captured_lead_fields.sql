-- Persists the name/phone captured by the capture_lead tool onto the
-- conversation itself, so UI that already has the conversation in hand (the
-- recovery-tracker patient profile modal) can pre-fill instead of asking the
-- clinic to retype data the AI already collected.
alter table conversations add column if not exists captured_lead_name text;
alter table conversations add column if not exists captured_lead_phone text;
