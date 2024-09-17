import { SignUpPageButton } from '../ui/buttons/Buttons';
import logo from "../../assets/image/movie-logo new.png";
import { Link } from 'react-router-dom';

function ClientAndAdminHeader() {
    
    
    return (
      <>
        <div className="w-full flex justify-between items-center p-3 bg-white px-10 h-20 shadow-lg sticky top-0">
          <div>
            <img className="w-10" src={logo} alt="logo" />
          </div>
  
          <nav className="flex items-center capitalize gap-4 font-semibold ">
        
            <div>
              <Link  > <SignUpPageButton/> </Link>
            </div>
          </nav>
         
        </div>
      </>
    );
  }
  


export default ClientAndAdminHeader