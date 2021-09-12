const request = require('supertest'); 
const db = require('../data/dbConfig');
const server = require('./server.js');
const Users = require('./users/users-model')

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

describe('server.js', () => {
  
  describe('Jokes endpoints', ()=> {
    it("[GET] /api/jokes should return a 401 status without authorization" , async () => {
      const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401);
    })
  })

  describe('Authorization Endpoints', () => {
    
    describe("[POST] /api/auth/register", () => {
      it('should return a status 201', async () => {
        const newUser = {
          username: "Spock",
          password: "fascinating"
        }
        const res = await request(server)
                          .post('/api/auth/register')
                          .send(newUser)
        expect(res.status).toBe(201)
      })
      it("should return a user with correct username and password", async () =>{
        const newUser = {
          username: "Spock",
          password: "fascinating"
        }
        const res = await request(server)
                          .post('/api/auth/register')
                          .send(newUser)
        const expected = await db('users')
                                .where('username', "Spock")
        expect(res.body).toEqual(expected)
      })
    })

    describe("[POST] /api/auth/login", () => {
      it("Should return a status 200", async () => {
        const newUser = {
          username: "Spock",
          password: "fascinating"
        }
        await request(server)
              .post('/api/auth/register')
              .send(newUser)
        const res = await request(server)
                            .post('/api/auth/login')
                            .send(newUser)
        expect(res.status).toBe(200)                      
      })
      it("Should return a message welcoming user", async () => {
        const newUser = {
          username: "Spock",
          password: "fascinating"
        }
        await request(server)
              .post('/api/auth/register')
              .send(newUser)
        const res = await request(server)
                            .post('/api/auth/login')
                            .send(newUser)
        expect(res.body.message).toEqual("welcome, Spock")
      })
      it("Should return a 401 status if username and password is wrong", async () => {
        const newUser = {
          username: "Spock",
          password: "fascinating"
        }
        const wrongUser = {
          username: "BeardedSpock",
          password: "mirrormirror"
        }
        await request(server)
              .post('/api/auth/register')
              .send(newUser)
        const res = await request(server)
                            .post('/api/auth/login')
                            .send(wrongUser)
        expect(res.status).toBe(401)
      })
    })
  })

})


