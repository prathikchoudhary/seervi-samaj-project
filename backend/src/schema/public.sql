create table if not exists settings (
  id text primary key,
  details jsonb
);

create table if not exists districts (
  name text not null,
  state text not null
);

create table if not exists talukas (
  name text not null,
  district text not null
);

create table if not exists villages (
  name text not null,
  taluka text not null
);

create table if not exists verified_emails (
  email text primary key,
  verified_at timestamptz default current_timestamp(3)
);

create table if not exists otps (
  req_id varchar(21) primary key,
  otp varchar(6) not null,
  receipient text not null,
  reason text not null,
  created_at timestamptz default current_timestamp(3),
  expires_at timestamptz not null,
  data jsonb
);

create table if not exists members (
  id varchar(21) primary key,
  first_name text,
  middle_name text,
  last_name text,
  dob date,
  gender varchar(20),
  married boolean,
  gotra text,
  native_place_state text,
  native_place_district text,
  native_place_taluka text,
  native_place_village text,
  native_place_pincode text,
  current_address_state text,
  current_address_district text,
  current_address_taluka text,
  current_address_pincode text,
  current_address_street1 text,
  current_address_street2 text,
  education_level text,
  education_stream text,
  employment_status text,
  employment_sector text,
  business_state text,
  business_district text,
  business_pincode text,
  business_street1 text,
  business_street2 text,
  business_gst_no text,
  mobile text,
  whatsapp text,
  email text unique,
  created_at timestamptz default current_timestamp(3)
);

create table if not exists sessions (
  id varchar(21) primary key,
  member_id varchar(21) not null,
  created_at timestamptz not null default current_timestamp(3),
  expires_at timestamptz not null,
  refreshed_at timestamptz,
  device jsonb,
  CONSTRAINT fk__sessions__member_id FOREIGN KEY(member_id) REFERENCES members(id) ON DELETE CASCADE
);
