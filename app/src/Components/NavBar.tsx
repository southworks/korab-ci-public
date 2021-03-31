import { NavLink } from 'react-router-dom';

export const NavBar = () => <div>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'row', gap: '20px', zIndex: 88888, position: 'relative' }}>
        <li>
            <NavLink to="/">Home</NavLink>
        </li>
        <li>
            <NavLink to="/about">About</NavLink>
        </li>
        <li>
            <NavLink to="/bubbles">Bubbles</NavLink>
        </li>
        <li>
            <NavLink to="/non-existant">404</NavLink>
        </li>
    </ul>

</div>