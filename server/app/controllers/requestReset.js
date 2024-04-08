const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 12;

exports.resetRequest = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: req.body.email
            },
        });

        if (!user) {
            return res.json({ message: "ok" });
        }

        const token = await bcrypt.hash(crypto.randomBytes(40).toString("hex") + user.email, saltRounds);

        await prisma.resetToken.upsert({
            where: {
              email: user.email,
            },
            update: {
              token: token,
            },
            create: {
              token: token,
              email: user.email,
            },
        })

        return res.json({ message: "ok", token: token});
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Something went wrong, try again later!" });
    }
};