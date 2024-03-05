import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from '@/services';

export { Layout };

function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue?.username) {
            router.push('/');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}