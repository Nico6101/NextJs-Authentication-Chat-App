import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Link } from '.';
import { ReactNode } from 'react';

export { NavLink };


interface MyComponentProps {
    href: string;
    children: ReactNode | ReactNode[];
    exact?: boolean;
    className?: string;
    // Define other props if needed
}

const NavLink: React.FC<MyComponentProps> = ({ children, href, exact, ...props }) => {
    const { pathname } = useRouter();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        props.className += ' active';
    }

    return <Link href={href} {...props}>{children}</Link>;
}

NavLink.propTypes = {
    href: PropTypes.string.isRequired,
    exact: PropTypes.bool
};

NavLink.defaultProps = {
    exact: false
};
