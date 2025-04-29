const Sidebar = () => {
  return (
    <>
      <h1 className="text-2xl text-dark font-bold mb-8 mt-4 text-center">ClubAdvantage</h1>
      <nav>
        <ul className="space-y-4">
          <li className="rounded bg-dark text-white text-center text-xs hover:bg-primary py-2">
            <a href="#">Accueil</a>
          </li>
          <li className="rounded bg-dark text-white text-center text-xs hover:bg-primary py-2">
            <a href="#">Profil</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
