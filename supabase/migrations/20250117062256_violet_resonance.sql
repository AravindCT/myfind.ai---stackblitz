/*
  # Initial schema setup for bank auction platform

  1. New Tables
    - properties: Stores property listings with detailed information
    - property_images: Stores property images with references to properties
    - auctions: Manages auction details for properties
    - bids: Tracks user bids on auctions

  2. Security
    - Enable RLS on all tables
    - Add policies for public access to properties, images, and auctions
    - Add policies for authenticated users to view and place bids

  3. Performance
    - Add indexes for commonly queried columns
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  property_type text NOT NULL,
  built_area numeric NOT NULL,
  land_area numeric,
  bedrooms integer,
  bathrooms integer,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  postal_code text NOT NULL,
  latitude numeric,
  longitude numeric,
  amenities text[],
  property_id text,
  ownership_type text,
  possession_status text,
  zone_type text,
  reserve_price numeric,
  earnest_money numeric,
  inspection_dates timestamptz[],
  seller_bank text,
  property_docs jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create auctions table
CREATE TABLE IF NOT EXISTS auctions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft',
  base_price numeric NOT NULL,
  reserve_price numeric,
  current_price numeric,
  bid_increment numeric NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auction_id uuid REFERENCES auctions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  amount numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- Create policies (with existence check)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'properties' AND policyname = 'Anyone can view properties'
  ) THEN
    CREATE POLICY "Anyone can view properties"
      ON properties FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'property_images' AND policyname = 'Anyone can view property images'
  ) THEN
    CREATE POLICY "Anyone can view property images"
      ON property_images FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'auctions' AND policyname = 'Anyone can view auctions'
  ) THEN
    CREATE POLICY "Anyone can view auctions"
      ON auctions FOR SELECT
      TO public
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bids' AND policyname = 'Authenticated users can view bids'
  ) THEN
    CREATE POLICY "Authenticated users can view bids"
      ON bids FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'bids' AND policyname = 'Authenticated users can place bids'
  ) THEN
    CREATE POLICY "Authenticated users can place bids"
      ON bids FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS properties_city_idx ON properties(city);
CREATE INDEX IF NOT EXISTS properties_state_idx ON properties(state);
CREATE INDEX IF NOT EXISTS properties_property_type_idx ON properties(property_type);
CREATE INDEX IF NOT EXISTS auctions_status_idx ON auctions(status);
CREATE INDEX IF NOT EXISTS auctions_end_date_idx ON auctions(end_date);