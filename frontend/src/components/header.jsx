import logo from '/logo.png'

const Header = () => {
  return (
      <div className='flex items-center justify-between w-full'>
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
  );
};

export default Header;