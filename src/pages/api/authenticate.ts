import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import getConfig from 'next/config';

import { apiHandler, usersRepo } from '@/helpers/api';
import { NextApiRequest, NextApiResponse } from 'next';

const { serverRuntimeConfig } = getConfig();

export default apiHandler({
    post: authenticate
});

function authenticate(req:NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const user = usersRepo.find((u: any) => u.email === email);

    // validate
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'email or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    // return basic user details and token
    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        token
    });
}
