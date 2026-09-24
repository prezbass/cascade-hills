CREATE DATABASE IF NOT EXISTS cascade_hills_web CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cascade_hills_web;
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(254) NOT NULL,
  contact_notes TEXT NOT NULL,
  submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  email_sent_at DATETIME NULL,
  ip_address VARCHAR(45) NULL,
  user_agent VARCHAR(500) NULL,
  PRIMARY KEY (id),
  INDEX idx_contact_submissions_submitted_at (submitted_at),
  INDEX idx_contact_submissions_email (email)
) ENGINE=InnoDB;
