import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from '@/services';
import { useRouter } from 'next/router';

export { Nav };

function Nav() {
    const Router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
        Router.push('/account/login');
    }

    // only show nav when logged in
    if (!(user && Object.keys(user).length)) return null;

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
            </div>
        </nav>
    );
}