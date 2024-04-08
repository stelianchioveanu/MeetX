const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.signout = async (req, res) => {
    try {
        await prisma.accessToken.deleteMany({
            where: {
              token: req.session.tokenMeetX,
            },
        })
        req.session = null;
        return res.json({ message: "ok" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Something went wrong, try again later!" });
    }
};