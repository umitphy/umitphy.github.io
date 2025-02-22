import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menü</h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Ana Sayfa
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" activeClassName="active">
              Yazılar
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              Hakkımda
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;