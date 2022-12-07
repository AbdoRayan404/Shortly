import request from "supertest";
import app from './app.js'

let randomAccount = {
    email: `jest${Math.floor(Math.random() * 1000)}@gmail.com`,
    password: 'jest123456789',
    token: null,
    refreshToken: null,
    shortened: []
}

describe('Users API route', ()=> {
    describe('Register endpoint', ()=> {
        test('Should response with 200 code', async ()=> {
            const response = await request(app).post('/v2/api/users/register').send(randomAccount)

            expect(response.statusCode).toBe(200)
        })

        test('Should response with 400 code (duplicate accounts)', async ()=> {
            const response = await request(app).post('/v2/api/users/register').send(randomAccount)

            expect(response.statusCode).toBe(400)
        })

        test('Should response with 400 code (regex check)', async ()=> {
            const email = await request(app).post('/v2/api/users/register').send({email: 'something', password: randomAccount.password})
            const password = await request(app).post('/v2/api/users/register').send({email: randomAccount.email, password: 'smol'})


            expect(email.statusCode).toBe(400)
            expect(password.statusCode).toBe(400)
        })

        test('Should response with 400 code (missing body data)', async ()=> {
            const noPassword = await request(app).post('/v2/api/users/register').send({email: randomAccount.email})
            const noEmail = await request(app).post('/v2/api/users/register').send({password: randomAccount.password})

            expect(noPassword.statusCode).toBe(400)
            expect(noEmail.statusCode).toBe(400)
        })
    })

    describe('Login endpoint', ()=> {
        test('Should response with 200 code, set-cookie header, refreshToken in the body', async ()=> {
            const response = await request(app).post('/v2/api/users/login').send(randomAccount)

            randomAccount.token = response.headers['set-cookie'][0].split(';')[0]
            randomAccount.refreshToken = response.body.refreshToken

            expect(response.statusCode).toBe(200)
            expect(response.headers['set-cookie'].length).toBe(1)
            expect(response.body.refreshToken).not.toBeNaN()
        })

        test('Should response with 400 code (incorrect account)', async ()=> {
            const response = await request(app).post('/v2/api/users/login').send({email: 'bruh', password: 'bruh'})

            expect(response.statusCode).toBe(400)
        })

        test('Should response with 400 code (missing body data)', async ()=> {
            const noPassword = await request(app).post('/v2/api/users/login').send({email: randomAccount.email})
            const noEmail = await request(app).post('/v2/api/users/login').send({password: randomAccount.password})
            const noData = await request(app).post('/v2/api/users/login')


            expect(noPassword.statusCode).toBe(400)
            expect(noEmail.statusCode).toBe(400)
            expect(noData.statusCode).toBe(400)
        })
    })

    describe('Auth endpoint', ()=> {
        test('Should response with 202 code', async ()=> {
            const response = await request(app).get('/v2/api/users/auth').set('Cookie', [randomAccount.token])

            expect(response.statusCode).toBe(202)
        })

        test('Should response with 401 code (invalid token)', async ()=> {
            const response = await request(app).get('/v2/api/users/auth').set('Cookie', [`JWT_TOKEN=INVALID`])

            expect(response.statusCode).toBe(401)
        })

        test('Should response with 401 code (no token cookie)', async ()=> {
            const response = await request(app).get('/v2/api/users/auth')

            expect(response.statusCode).toBe(401)
        })
    })


    describe('Feedback endpoint', ()=> {
        test('Should response with 200 code', async ()=> {
            const response = await request(app).post('/v2/api/users/feedback').set('Cookie', [randomAccount.token]).send({name: 'test', email: 'test@gmail.com', subject:'Test subject'})
        
            expect(response.statusCode).toBe(200)
        })

        test('Should response with 200 code (empty body)', async ()=> {
            const response = await request(app).post('/v2/api/users/feedback').set('Cookie', [randomAccount.token]).send({email: 'test@gmail.com'})

            expect(response.statusCode).toBe(200)
        })
    })

    describe('Token endpoint', ()=> {
        test('Should response with 200 code, set-cookie header', async ()=> {
            const response = await request(app).post('/v2/api/users/token').send({token: randomAccount.refreshToken})

            expect(response.statusCode).toBe(200)
            expect(response.headers['set-cookie'].length).toBe(1)
        })

        test('Should response with 400 (no refreshToken provided)', async ()=> {
            const response = await request(app).post('/v2/api/users/token')

            expect(response.statusCode).toBe(400)
        })

        test('Should response with 400 code (invalid token)', async ()=> {
            const response = await request(app).post('/v2/api/users/token').send({token: 'INVALID'})

            expect(response.statusCode).toBe(400)
        })
    })

    describe('Profile endpoints (inspect, update)', ()=> {
        test('Should response with 200 code, user object (inspect)', async ()=> {
            const response = await request(app).get('/v2/api/users/inspect').set('Cookie', [randomAccount.token])

            expect(response.statusCode).toBe(200)
            expect(response.body.user.username).toBe(randomAccount.email.split('@')[0])
        })

        test('Should response with 200 code (update)', async ()=> {
            const updateResponse = await request(app).post('/v2/api/users/update').set('Cookie', [randomAccount.token]).send({username: 'JestTestBOYYY'})
            const inspectResponse = await request(app).get('/v2/api/users/inspect').set('Cookie', [randomAccount.token])


            expect(updateResponse.statusCode).toBe(200)
            expect(inspectResponse.statusCode).toBe(200)
            expect(inspectResponse.body.user.username).toBe('JestTestBOYYY')
        })
    })
})


describe('Links Related Tests', ()=> {
    describe('Create endpoint', ()=> {
        test('Should response with 200 code, shortened code (full url)', async ()=>{
            const response = await request(app).post('/v2/api/links/create').set('Cookie', [randomAccount.token]).send({url: 'https://www.example.com'})

            randomAccount.shortened.push(response.body.shortened)
            console.log(response.body)
            expect(response.statusCode).toBe(200)
            expect(response.body.shortened).not.toBeNaN()
        })

        test('Should response with 200 code, shortened code (without protocol)', async ()=>{
            const response = await request(app).post('/v2/api/links/create').set('Cookie', [randomAccount.token]).send({url: 'www.example.com'})

            randomAccount.shortened.push(response.body.shortened)

            expect(response.statusCode).toBe(200)
            expect(response.body.shortened).not.toBeNaN()
        })

        test('Should response with 400 code (domain only)', async ()=>{
            const response = await request(app).post('/v2/api/links/create').set('Cookie', [randomAccount.token]).send({url: 'example.com'})

            expect(response.statusCode).toBe(400)
        })

        test('Should response with 400 code (invalid url)', async ()=>{
            const response = await request(app).post('/v2/api/links/create').set('Cookie', [randomAccount.token]).send({url: 'INVALID'})

            expect(response.statusCode).toBe(400)
        })

        test('Should response with 401 code (no jwt token)', async ()=>{
            const response = await request(app).post('/v2/api/links/create').send({url: 'https://example.com'})

            expect(response.statusCode).toBe(401)
        })
    })

    describe('Inspect endpoint', ()=> {
        test('Should response with 200 code, shortened urls', async ()=> {
            const response = await request(app).get('/v2/api/links/inspect').set('Cookie', [randomAccount.token])

            expect(response.statusCode).toBe(200)
            expect(response.body.links.length).toBe(randomAccount.shortened.length)
        })

        test('Should response with 401, (no jwt token)', async ()=> {
            const response = await request(app).get('/v2/api/links/inspect')

            expect(response.statusCode).toBe(401)
        })
    })
})