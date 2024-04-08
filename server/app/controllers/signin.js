const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: req.body.email
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({ error: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });
    
        await prisma.accessToken.create({
            data: {
              token: token,
              userId: user.id
            },
        });

        req.session.tokenMeetX = token;
        return res.json({ message: "ok" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Something went wrong, try again later!" });
    }
};