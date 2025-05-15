import NavLinkButton from "./NavLink";

const Sidebar = () => {
  return (
    <>
      <h1 className="text-2xl text-dark font-bold mb-8 mt-4 text-center">ClubAdvantage</h1>
      <nav>
        <ul className="space-y-4">
            <NavLinkButton to="/" label="Accueil" />
            <NavLinkButton to="/profil" label="Profil" />
            <NavLinkButton to="/committees" label="CSE" />
            <NavLinkButton to="/offers" label="Offres" />
            <NavLinkButton to="/scan" label="Scan" />
            <NavLinkButton to="/roles" label="Roles" />
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
