// Timezone utility functions for consistent date handling across the application

// Default timezone for the application (can be made configurable)
export const DEFAULT_TIMEZONE = 'Asia/Kolkata';

/**
 * Get user's browser timezone
 * @returns {string} User's timezone (e.g., "Asia/Kolkata")
 */
export function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Format time only (e.g., "2:30 PM")
 * @param {Date|string} date - Date object or ISO string
 * @param {string} timezone - Timezone (default: user's timezone)
 * @returns {string} Formatted time string
 */
export function formatTime(date, timezone = getUserTimezone()) {
  let dateObj;
  if (typeof date === 'string') {
    // Parse IST storage string without UTC conversion
    if (date.includes('T') && !date.includes('Z')) {
      dateObj = parseISTStorageString(date);
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj);
}

/**
 * Format date and time (e.g., "July 21, 2025 at 2:30 PM")
 * @param {Date|string} date - Date object or ISO string
 * @param {string} timezone - Timezone (default: user's timezone)
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(date, timezone = getUserTimezone()) {
  let dateObj;
  if (typeof date === 'string') {
    // Parse IST storage string without UTC conversion
    if (date.includes('T') && !date.includes('Z')) {
      dateObj = parseISTStorageString(date);
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(dateObj);
}

/**
 * Format date only (e.g., "Monday, July 21, 2025")
 * @param {Date|string} date - Date object or ISO string
 * @param {string} timezone - Timezone (default: user's timezone)
 * @returns {string} Formatted date string
 */
export function formatDate(date, timezone = getUserTimezone()) {
  let dateObj;
  if (typeof date === 'string') {
    // Parse IST storage string without UTC conversion
    if (date.includes('T') && !date.includes('Z')) {
      dateObj = parseISTStorageString(date);
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Format time range (e.g., "2:30 PM - 3:30 PM")
 * @param {Date|string} startDate - Start date object or ISO string
 * @param {Date|string} endDate - End date object or ISO string
 * @param {string} timezone - Timezone (default: user's timezone)
 * @returns {string} Formatted time range string
 */
export function formatTimeRange(startDate, endDate, timezone = getUserTimezone()) {
  const startTime = formatTime(startDate, timezone);
  const endTime = formatTime(endDate, timezone);
  return `${startTime} - ${endTime}`;
}

/**
 * Format date only with short format (e.g., "EEEE, MMMM d")
 * @param {Date|string} date - Date object or ISO string
 * @param {string} timezone - Timezone (default: user's timezone)
 * @returns {string} Formatted date string
 */
export function formatDateShort(date, timezone = getUserTimezone()) {
  let dateObj;
  if (typeof date === 'string') {
    // Parse IST storage string without UTC conversion
    if (date.includes('T') && !date.includes('Z')) {
      dateObj = parseISTStorageString(date);
    } else {
      dateObj = new Date(date);
    }
  } else {
    dateObj = date;
  }
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(dateObj);
}

/**
 * Server-side formatting for slot generation (explicit IST)
 * @param {Date} date - Date object
 * @returns {string} Formatted time string in IST
 */
export function formatTimeIST(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: DEFAULT_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

/**
 * Server-side formatting for date generation (explicit IST)
 * @param {Date} date - Date object
 * @returns {string} Formatted date string in IST
 */
export function formatDateIST(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: DEFAULT_TIMEZONE,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

/**
 * Convert Date object to IST storage string (for database)
 * @param {Date} date - Date object
 * @returns {string} IST string in YYYY-MM-DDTHH:mm:ss format
 */
export function toISTStorageString(date) {
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}T${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`;
}

/**
 * Parse IST storage string back to Date object
 * @param {string} istString - IST string in YYYY-MM-DDTHH:mm:ss format
 * @returns {Date} Date object representing IST time
 */
export function parseISTStorageString(istString) {
  const [datePart, timePart] = istString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, seconds || 0);
}

// Legacy functions for backward compatibility
// These functions are simplified and don't require date-fns-tz

export function safeParseDate(dateInput) {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  
  if (typeof dateInput === 'string') {
    // Parse IST storage string without UTC conversion
    if (dateInput.includes('T') && !dateInput.includes('Z')) {
      return parseISTStorageString(dateInput);
    } else {
      return new Date(dateInput);
    }
  }
  
  return new Date();
}

export function getCurrentTimeInTimezone(timezone = DEFAULT_TIMEZONE) {
  return new Date(); // Simplified - returns current time as Date object
}