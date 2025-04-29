import logo from '/logo.png'

const Header = () => {
  return (
    <header className="bg-secondary shadow p-4">
      <div className='flex items-center justify-between'>
        <div>
          <img
            src={logo}
            alt="Logo ClubAdvantage"
            className='h-15'
          />
        </div>
        <div className="text-2xl font-bold">Dashboard</div>
        <button className='bg-dark font-poppins text-xs px-3 py-2 rounded text-white hover:bg-primary' type='button'>Déconnexion</button>
      </div>
    </header>
  );
};

export default Header;