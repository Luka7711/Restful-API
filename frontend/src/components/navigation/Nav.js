import { Link } from 'react-router-dom';
import './nav.css'

const createLinks = (isAuthorized) => {
    const defaultLinks = [
        { url: "/", link: "Home" },
        { url: "About", link: "About" },
        { url: "Contact", link: "Contact" },
    ]
    const unsignedLinks = [
        { url: 'register', link:'Sign up' },
        { url: 'login', link:'Login'}
    ];
    const authorizedLinks = [
        { url: 'Account', link: 'Account'},
        { url: 'Profile', link: 'Profile'}
    ];

    let defLinks = defaultLinks.map((element, i) => <li key={element.link}><Link to={element.url}>{element.link}</Link></li>);

    let restLinks = isAuthorized? authorizedLinks : unsignedLinks;

    restLinks.map((element) => {
        let jsx = <li key={element.link}><Link to={ element.url }> { element.link } </Link> </li>
        defLinks.push(jsx)
    })
    return defLinks
}


const Nav = ({ loggedIn }) => {
    const links = createLinks(loggedIn);
    return (
        <div>
            <nav className="main nav">
                <ul>
                    { links }
                </ul>
            </nav>
        </div>
    )
}

export default Nav;