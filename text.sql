
  CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  profile_picture TEXT,
  address TEXT,
  create_at TIMESTAMP DEFAULT NOW(),
  update_at TIMESTAMP DEFAULT NOW()
);