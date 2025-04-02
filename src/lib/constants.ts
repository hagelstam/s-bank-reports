export const IS_PROD = process.env.NODE_ENV === 'production';

export const MAX_CSV_SIZE = 5 * 1024 * 1024; // 5MB

export const DEMO_CSV = `Bokningsdag;Betalningsdag;Belopp;Betalningstyp;Betalare;Mottagarens namn;Mottagarens kontonummer;Mottagarens BIC-kod;Referensnummer;Meddelande;Arkiveringkod
01.01.2024;01.01.2024;1000,00;Överföring;John Doe;Jane Smith;FI1234567890123456;NDEAFIHH;REF123;Salary;A
02.01.2024;02.01.2024;-50,00;Överföring;John Doe;Grocery Store;FI9876543210987654;NDEAFIHH;REF124;Groceries;A
03.01.2024;03.01.2024;-30,00;Överföring;John Doe;Netflix;FI1112223334445556;NDEAFIHH;REF125;Netflix subscription;A`;
