export const getSwedishRedDays = (year) => {
  
  const format = (date) => {
    const iso = date.toISOString();

    return iso.split('T')[0]; // YYYY-MM-DD
  };

  // Correct Gregorian Easter calculation
  const getEaster = (y) => {
    const a = y % 19;
    const b = Math.floor(y / 100);
    const c = y % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(Date.UTC(y, month - 1, day));
  };

  const easter = getEaster(year);

  const redDays = [
    // Fixed holidays
    `${year}-01-01`, // New Year's Day
    `${year}-01-06`, // Epiphany
    `${year}-05-01`, // International Workers' Day
    `${year}-06-06`, // National Day
    `${year}-12-25`, // Christmas
    `${year}-12-26`, // Boxing Day

    // Movable holidays based on Easter
    format(new Date(easter.getTime() - 2 * 86400000)), // Good Friday
    format(easter), // Easter Sunday
    format(new Date(easter.getTime() - 86400000)), // Easter Eve (Holy Saturday)
    format(new Date(easter.getTime() + 86400000)), // Easter Monday (Annandag Påsk)
    format(new Date(easter.getTime() + 39 * 86400000)), // Ascension Day
    format(new Date(easter.getTime() + 49 * 86400000)), // Pentecost (Whitsun)

    // Midsummer Day: Saturday between June 20–26
    (() => {
      for (let d = 20; d <= 26; d++) {
        
        const date = new Date(year, 5, d);

        if (date.getDay() === 6) return format(date);
      }

      throw new Error(`Midsummer Day not found for year: ${year}`);
    })(),

    // All Saints' Day: Saturday between Oct 31–Nov 6
    (() => {

      for (let d = 31; d <= 6; d++) {

        const date = new Date(year, 9, d);

        if (date.getDay() === 6) return format(date);
      }

      const lastSaturdayInOctober = new Date(year, 9, 31);
      const dayOfWeek = lastSaturdayInOctober.getDay();
      const daysToAdd = (6 - dayOfWeek + 7) % 7;
      lastSaturdayInOctober.setDate(lastSaturdayInOctober.getDate() + daysToAdd + 1);
  
      return format(lastSaturdayInOctober);
    })()
  ];

  return redDays.filter(Boolean);
};