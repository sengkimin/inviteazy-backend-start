CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    profile_picture TEXT,
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE events (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  event_name TEXT NOT NULL,
  event_datetime TIMESTAMP NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invitees (
    id UUID PRIMARY KEY,
    event_id UUID REFERENCES events(id),
    user_id UUID REFERENCES users(id),
    status TEXT CHECK (status IN ('pending', 'accept', 'maybe', 'no', 'busy')),
    qr_code TEXT,
    is_checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);


ALTER TABLE invitees
ADD COLUMN is_checked_out BOOLEAN DEFAULT false,
ADD COLUMN checked_out_at TIMESTAMP;

ALTER TABLE invitees ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE invitees ADD COLUMN gift_money NUMERIC DEFAULT 0;


CREATE TABLE invitees (
    id UUID PRIMARY KEY,
    event_id UUID REFERENCES events(id),
    user_id UUID REFERENCES users(id),
    status TEXT CHECK (status IN ('pending', 'accept', 'maybe', 'no', 'busy')),
    qr_code TEXT,
    is_checked_in BOOLEAN DEFAULT FALSE,
    checked_in_at TIMESTAMP,
    is_checked_out BOOLEAN DEFAULT FALSE,
    checked_out_at TIMESTAMP,
    gift NUMERIC DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
