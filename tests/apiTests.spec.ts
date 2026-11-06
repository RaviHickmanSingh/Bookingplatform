import { test, expect } from './utils/fixtures';

test('GET /api/bookings loads bookings', { tag: '@api' }, async ({ request }) => {
    const response = await request.get('/api/bookings');
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBe(true);
    //the user i am testing has bookings so i have added these tests
    expect(bookings.length).toBeGreaterThan(0); 
    expect(bookings[0]).toHaveProperty('date')
});

//negative api test booking with no rink selected 
test('POST /api/bookings rejects missing slots', { tag: '@api' }, async ({ request }) => {
    const response = await request.post('/api/bookings', {
        data: { date: '2026-11-07' },
    });
    expect(response.status()).toBe(400);
});