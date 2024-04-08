const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 12;

function isValidUsername(nameFunc) {
    const nameRegex = /^[\S]+$/;
    return nameFunc.length >= 8 && nameRegex.test(nameFunc);
}
  
function isValidEmail(emailFunc) {
    return /\S+@\S+\.\S+/.test(emailFunc);
}
  
function isValidPassword(passwordFunc) {
    return passwordFunc.length >= 12 && !/\s/.test(passwordFunc);
}

exports.signup = async (req, res) => {
    if (!isValidUsername(req.body.username)) {
        return res.status(400).json({ error: "The username must be at least 8 characters or without spaces", target: "username"  });
    }
  
    if (!isValidEmail(req.body.email)) {
        return res.status(400).json({ error: "Invalid email", target: "email" });
    }
  
    if (!isValidPassword(req.body.password)) {
        return res.status(400).json({ error: "Invalid password (minimum 12 characters without spaces)", target: "password" });
    }
  
    try {
        await prisma.user.create({
            data: {
              username: req.body.username,
              email: req.body.email,
              password: await bcrypt.hash(req.body.password, saltRounds),
              imageUrl: "default"
            },
        });
        return res.json({ message: "ok" });
    } catch (e) {
        if (e.code === "P2002") {
            return res.status(409).json({ error: `The ${e.meta.target[0]} is already in use!`, target: e.meta.target[0] });
        } else {
            console.log(e);
            return res.status(500).json({ error: "Something went wrong, try again later!" });
        }
    }
};