import { errorHandler } from '@/helpers/api';
import { NextApiRequest, NextApiResponse } from 'next';

export { apiHandler };

function apiHandler(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        console.log('inside api handler')
        const method = req.method?.toLowerCase() || "";

        // check handler supports HTTP method
        if (!handler[method])
            return res.status(405).end(`Method ${req.method} Not Allowed`);

        try {
            // route handler
            await handler[method](req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}