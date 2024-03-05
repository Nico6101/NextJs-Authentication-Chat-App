
import bcrypt from 'bcrypt'
import validator from 'validator';

import { apiHandler, usersRepo } from '@/helpers/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default apiHandler({
    post: register
});

function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // split out password from user details 
        const { password, ...user } = req.body;

        // Validate email and password (e.g., check for empty values, validate email format, etc.)
        if (!user.username || !user.email || !password || !validator.isEmail(user.email) || !validator.isStrongPassword(password)) {
            return res.status(400).json({ success: false, message: 'Username, Email and Password are required' });
        }

        // validate
        if (usersRepo.find((x: any) => x.username === user.username))
            throw `User with the username "${user.username}" already exists`;

        // hash password
        user.hash = bcrypt.hashSync(password, 10);
        console.log('user = ',user);
        usersRepo.create(user);
        return res.status(200).json({ success: true, message: 'User registered successfully' });
    }
    else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
