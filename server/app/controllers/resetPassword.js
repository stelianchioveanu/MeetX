const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 12;

exports.resetPassword = async (req, res) => {
    try {
        const token = await prisma.resetToken.findUnique({
            where: {
              token: req.body.token
            },
        });

        if (!token) {
          return res.status(401).json({ error: "Token invalid!" });
        } else {
          await prisma.resetToken.delete({
            where: {
              token: req.body.token
            },
        });
        }

        await prisma.user.update({
          where: {
            email: token.email,
          },
          data: {
            password: await bcrypt.hash(req.body.password, saltRounds),
          },
        })

        return res.json({ message: "ok" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Something went wrong, try again later!" });
    }
};