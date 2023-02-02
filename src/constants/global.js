
export const isProduction = process.env.NODE_ENV === 'production';

export const CLIENT_URL = isProduction ?
    'https://vjcxgodediuyprqxqpzo.supabase.co':
    'https://hyvejtfnrltucuinvlsc.supabase.co';
export const ANON_KEY = isProduction ?
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqY3hnb2RlZGl1eXBycXhxcHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkxMDAwODYsImV4cCI6MTk3NDY3NjA4Nn0.047HbUPIrWls_LqEt-lF5AVsiz_MKIadO2ULI1Et_Fs':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5dmVqdGZucmx0dWN1aW52bHNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkwMjUzMzcsImV4cCI6MTk3NDYwMTMzN30.3tGq0qUkaRV87vlyYFZ4oGSOixiGBvOkbLmBL9qfkxE';
