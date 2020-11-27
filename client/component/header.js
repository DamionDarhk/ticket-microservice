import Link from 'next/link';

export default ({currentUserOutput}) => {
    const links = [
        !currentUserOutput && { label: 'Register', href: 'authentication/registration' },
        !currentUserOutput && { label: 'Login', href: 'authentication/login' },
        currentUserOutput && { label: 'Logout', href: 'authentication/logout' }
    ]
    .filter(linkConfig => linkConfig)
    .map(({label, href}) => {
        return (
            <li key={href} className='nav-item'>
                <Link href={href}>
                    <a className='nav-link'>{label}</a>
                </Link>
            </li>
        )
    })


    return <nav className='navbar navbar-light bg-light'>
        <Link href='/'>
            <a className='navbar-branf'>SourceOne</a>
        </Link>

        <div className='flex justify-content-end'>
            <ul className='nav d-flex alien-items-center'>
                {links}
            </ul>
        </div>
    </nav>
};