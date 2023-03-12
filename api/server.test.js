// testleri buraya yazın

const superTest = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

test("[0] Testler çalışır durumda]", () => {
  expect(true).toBe(true);
});
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

describe("Server Test", () => {
  it("[1] Server çalışıyor mu", async () => {
    const res = await superTest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server Çalışıyor");
  });
});

describe("Register and Login test", () => {
  it("[2] Register Başarılı mı", async () => {
    const res = await superTest(server)
      .post("/api/auth/register")
      .send({ username: "furkanozturk", password: "159357" });
    expect(res.body.message).toBe("Hoşgeldin furkanozturk");
  }, 1000);
  it("[3] Register de username veya password eksikse hata veriyor mu", async () => {
    const res = await superTest(server)
      .post("/api/auth/register")
      .send({ username: "furkanozturk" });
    expect(res.body.message).toBe("username ve şifre gereklidir");
  }, 1000);
  it("[4] Register de username alındıysa hata veriyor mu", async () => {
    const res = await superTest(server)
      .post("/api/auth/register")
      .send({ username: "furkanozturk", password: "159357" });
    expect(res.body.message).toBe("username alınmış");
  }, 1000);
  it("[5] Login başarılı mı", async () => {
    const res = await superTest(server)
      .post("/api/auth/login")
      .send({ username: "furkanozturk", password: "159357" });
    expect(res.body.message).toBe("Hoşgeldin furkanozturk");
    expect(res.body.token).toBeDefined();
  }, 1000);
});
