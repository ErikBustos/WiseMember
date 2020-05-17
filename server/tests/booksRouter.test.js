const app = require('../app');
const request = require('supertest');

test("Testing api Books GET method", async() => {
    let resp = await request(app)
                            .get('/api/books')
                            .expect(200)
    expect(Array.isArray(resp.body)).toBe(true);
})


test("Testing api Books GET method given a title", async() => {
    let queryparam= 'scarlet';
    let resp = await request(app)
                            .get('/api/books?title='+queryparam)
                            .expect(200)
    expect(resp.body[0].title).toBe('Beneath a Scarlet Sky: A Novel');
    expect(resp.body[0].author).toBe('Mark Sullivan');
})

test("Testing api Books GET method given a author", async() => {
    let queryparam= 'Ray';

    let resp = await request(app)
                            .get('/api/books?author='+ queryparam)
                            .expect(200)

    expect(resp.body[0].author).toBe('Ray Bradbury');
})

test("Testing api Books GET method given a author that is not in the database", async() => {
    let queryparam= 'weirdName';

    let resp = await request(app)
                            .get('/api/books?author='+ queryparam)
                            .expect(404)

    expect(resp.body).toBe('Book not found');
})