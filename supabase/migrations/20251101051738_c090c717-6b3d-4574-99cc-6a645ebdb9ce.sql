-- Make user_id nullable in drivers table to allow registration without authentication
ALTER TABLE public.drivers 
ALTER COLUMN user_id DROP NOT NULL;

-- Update the foreign key constraint to allow NULL values
-- First drop the existing constraint
ALTER TABLE public.drivers 
DROP CONSTRAINT IF EXISTS drivers_user_id_fkey;

-- Recreate the foreign key constraint (will allow NULL values by default)
ALTER TABLE public.drivers 
ADD CONSTRAINT drivers_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES auth.users(id) 
ON DELETE CASCADE;