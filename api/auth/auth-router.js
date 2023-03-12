const router = require("express").Router();
const bcyrpt = require("bcryptjs");
const jsWTN = require("jsonwebtoken");
const userModel = require("./auth-model");
router.post("/register", async (req, res) => {
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.
    2^8 HASH TURUNU AŞMAYIN!

    1- Yeni bir hesap kaydetmek için istemci "kullanıcı adı" ve "şifre" sağlamalıdır:
      {
        "username": "Captain Marvel", // `users` tablosunda var olmalıdır
        "password": "foobar"          // kaydedilmeden hashlenmelidir
      }

    2- BAŞARILI kayıtta,
      response body `id`, `username` ve `password` içermelidir:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- Request bodyde `username` ya da `password` yoksa BAŞARISIZ kayıtta,
      response body şunu içermelidir: "username ve şifre gereklidir".

    4- Kullanıcı adı alınmışsa BAŞARISIZ kayıtta,
      şu mesajı içermelidir: "username alınmış".
  */
  try {
    const newUser = req.body;
    const checkUserName = await userModel.getByFilter({
      username: req.body.username,
    });

    if (!newUser.username || !newUser.password) {
      res.json({ message: "username ve şifre gereklidir" });
    }
    if (checkUserName) {
      res.json({
        message: "username alınmış",
      });
    } else {
      const hash = await bcyrpt.hash(newUser.password, 8);
      newUser.password = hash;
      const addedUser = await userModel.create(newUser);
      res.json({
        message: `Hoşgeldin ${addedUser.username}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.

    1- Var olan bir kullanıcı giriş yapabilmek için bir `username` ve `password` sağlamalıdır:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- BAŞARILI girişte,
      response body `message` ve `token` içermelidir:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- req body de `username` ya da `password` yoksa BAŞARISIZ giriş,
      şu mesajı içermelidir: "username ve password gereklidir".

    4- "username" db de yoksa ya da "password" yanlışsa BAŞARISIZ giriş,
      şu mesajı içermelidir: "geçersiz kriterler".
  */
  try {
    const loginUser = await userModel.getByFilter({
      username: req.body.username,
    });
    console.log(loginUser);
    if (!loginUser) {
      res.json({
        message: "geçersiz kriterler",
      });
    }
    if (!req.body.username || !req.body.password) {
      res.json({
        message: "username ve password gereklidir",
      });
    }
    if (
      loginUser &&
      bcyrpt.compareSync(req.body.password, loginUser.password)
    ) {
      const token = generatetoken(loginUser);
      res.json({
        message: `Hoşgeldin ${loginUser.username}`,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
function generatetoken(user) {
  const payload = {
    subject: user.id, //sub
    username: user.username,
    //....
  };
  const options = {
    expiresIn: "8h",
  };
  const token = jsWTN.sign(payload, "JWT_SECRET", options);
  return token;
}
module.exports = router;
