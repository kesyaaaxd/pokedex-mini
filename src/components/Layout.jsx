import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-logo">
          <span className="logo-ball">◉</span>

          <div>
            <h1>PokéDex</h1>
            <p>Explore the Pokémon world</p>
          </div>
        </Link>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          PokéDex Mini · Powered by{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
          >
            PokéAPI
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Layout;