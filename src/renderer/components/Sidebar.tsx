import menu from '../../../assets/menu.png'
import edit from '../../../assets/edit.png'
import { Link } from "react-router-dom";
import logout from '../../../assets/logout.png'
export default function Sidebar(){
    return (
    
          <div className="bg-violet-900 h-[100vh] fixed">
            <div className="p-4 text-2xl text-center pt-10 font-bold text-white">
              invoicer
            </div>
            <div className="flex  flex-col p-2">
              <div className="  p-2 text-gray-300 font-bold flex    hover:bg-white hover:shadow-md hover:rounded-md hover:text-violet-900 cursor-pointer w-[12rem]">
                <Link to={'/'} className="flex items-center">
                  <img className="w-5 h-5 " src={menu} />
                  <h1 className="px-10">Dashboard</h1>
                </Link>
              </div>
            </div>

            <div className="flex  flex-col p-2">
              <div className="  p-2 text-gray-300 font-bold flex    hover:bg-white hover:shadow-md hover:rounded-md hover:text-violet-900 cursor-pointer w-[12rem]">
                <Link to={'/add'} className="flex items-center">
                  <img className="w-5 h-5 " src={edit} />
                  <h1 className="px-10">AddInvoice</h1>
                </Link>
              </div>
            </div>
            <div className='absolute bottom-10 left-7 hover:bg-red-600 rounded-xl p-1 cursor-pointer '>
               <div >
                <img src={logout} />
               </div>
            </div>
          </div>
        
 
    );
}