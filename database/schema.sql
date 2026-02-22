-- UrbanNN core schema (MySQL 8+)
-- Run with:
--   /usr/local/mysql/bin/mysql -h 127.0.0.1 -P 3306 -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS urbannn;
USE urbannn;

SET NAMES utf8mb4;

-- App users: customer, worker, admin in one table (single-app role model)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NULL,
  phone VARCHAR(20) NULL,
  role ENUM('customer', 'worker', 'admin') NOT NULL DEFAULT 'customer',
  password_hash VARCHAR(255) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  UNIQUE KEY uq_users_phone (phone),
  KEY idx_users_role_active (role, is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Worker-specific profile data
CREATE TABLE IF NOT EXISTS worker_profiles (
  worker_id BIGINT UNSIGNED NOT NULL,
  city VARCHAR(100) NOT NULL,
  verification_status ENUM('pending', 'verified', 'rejected') NOT NULL DEFAULT 'pending',
  is_online TINYINT(1) NOT NULL DEFAULT 0,
  service_radius_km DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  avg_rating DECIMAL(3,2) NOT NULL DEFAULT 0.00,
  jobs_completed INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (worker_id),
  KEY idx_worker_profiles_city_online (city, is_online),
  KEY idx_worker_profiles_verification (verification_status),
  CONSTRAINT fk_worker_profiles_worker
    FOREIGN KEY (worker_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skills/services each worker can perform
CREATE TABLE IF NOT EXISTS worker_skills (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  worker_id BIGINT UNSIGNED NOT NULL,
  service_code VARCHAR(64) NOT NULL,
  service_name VARCHAR(120) NOT NULL,
  base_price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_worker_service (worker_id, service_code),
  KEY idx_worker_skills_service_active (service_code, is_active),
  CONSTRAINT fk_worker_skills_worker
    FOREIGN KEY (worker_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Customer addresses
CREATE TABLE IF NOT EXISTS addresses (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  label VARCHAR(60) NOT NULL DEFAULT 'Home',
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255) NULL,
  landmark VARCHAR(255) NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NULL,
  pincode VARCHAR(20) NULL,
  latitude DECIMAL(10,7) NULL,
  longitude DECIMAL(10,7) NULL,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_addresses_user_default (user_id, is_default),
  CONSTRAINT fk_addresses_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Booking lifecycle: request -> assignment -> service execution -> close
CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booking_code VARCHAR(40) NOT NULL,
  customer_id BIGINT UNSIGNED NOT NULL,
  assigned_worker_id BIGINT UNSIGNED NULL,
  service_code VARCHAR(64) NOT NULL,
  service_name VARCHAR(120) NOT NULL,
  address_id BIGINT UNSIGNED NULL,
  address_text VARCHAR(500) NULL,
  scheduled_start DATETIME NOT NULL,
  scheduled_end DATETIME NULL,
  status ENUM(
    'requested',
    'pending_assignment',
    'assigned',
    'accepted',
    'on_the_way',
    'arrived',
    'in_progress',
    'completed',
    'cancelled',
    'failed'
  ) NOT NULL DEFAULT 'requested',
  payment_method ENUM('cod', 'upi', 'card', 'wallet') NOT NULL DEFAULT 'cod',
  payment_status ENUM('pending', 'authorized', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
  amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  convenience_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  notes TEXT NULL,
  cancellation_reason VARCHAR(255) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_bookings_code (booking_code),
  KEY idx_bookings_customer_time (customer_id, scheduled_start),
  KEY idx_bookings_worker_time (assigned_worker_id, scheduled_start),
  KEY idx_bookings_status_time (status, scheduled_start),
  KEY idx_bookings_service_status (service_code, status),
  CONSTRAINT fk_bookings_customer
    FOREIGN KEY (customer_id) REFERENCES users(id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_bookings_worker
    FOREIGN KEY (assigned_worker_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_bookings_address
    FOREIGN KEY (address_id) REFERENCES addresses(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Immutable booking timeline/audit trail
CREATE TABLE IF NOT EXISTS booking_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  booking_id BIGINT UNSIGNED NOT NULL,
  event_type VARCHAR(64) NOT NULL,
  from_status VARCHAR(40) NULL,
  to_status VARCHAR(40) NULL,
  actor_user_id BIGINT UNSIGNED NULL,
  message VARCHAR(255) NULL,
  payload JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_events_booking_time (booking_id, created_at),
  KEY idx_booking_events_type_time (event_type, created_at),
  CONSTRAINT fk_booking_events_booking
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_booking_events_actor
    FOREIGN KEY (actor_user_id) REFERENCES users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional future use: worker free/busy windows for assignment engine
CREATE TABLE IF NOT EXISTS worker_availability (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  worker_id BIGINT UNSIGNED NOT NULL,
  available_start DATETIME NOT NULL,
  available_end DATETIME NOT NULL,
  is_available TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_worker_availability_window (worker_id, available_start, available_end),
  CONSTRAINT fk_worker_availability_worker
    FOREIGN KEY (worker_id) REFERENCES users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
