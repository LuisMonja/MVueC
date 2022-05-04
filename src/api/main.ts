import { Router } from "express";
import { User } from "../datasource/models/User";

export default (): Router => {
    let router = Router();

    router.post('/login', async (req, res) => {
        try {
            let { username, password } = req.body
            let user = await User.findOneBy({ username })

            if (!user) return res.status(401).send('User not found')

            if (!user.comparePassword(password)) return res.status(401).send('Invalid password')

            res.send(user)
        } catch (err) {
            res.status(500).send(err)
        }
    })

    return router;
}

