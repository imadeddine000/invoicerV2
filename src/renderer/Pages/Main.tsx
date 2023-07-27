import { useEffect, useState,useContext } from "react";
import Sidebar from "renderer/components/Sidebar"
import Invoice from "renderer/components/invoice"
import { Link, useLocation } from "react-router-dom";
import { invoicesContext } from "renderer/InvoicesContexte";
export default function Main(){
  //const [invoices,setinvoices]=useState([])
  const location=useLocation()
  const [dbinvoices, setDbinvoices] = useState([])
  const [dialogshowed, setdialogshowed] = useState(false)
  window.electron.ipcRenderer.once('get-data', (arg) => {
    //setinvoices(arg)
    setDbinvoices(arg)
  });
  const handleshowdialog=()=>{
    if(dialogshowed){
      setdialogshowed(false)
    }else{
      setdialogshowed(true)
    }
  }
  const handleDeleteInvoice=(id)=>{
    console.log('working')
    window.electron.ipcRenderer.sendMessage('delete-by-id',id)
  }
  
 
  
  useEffect(()=>{
    window.electron.ipcRenderer.sendMessage('get-data',['data']);
    
  },[location.key])
  
    return (
      <div className="flex flex-col w-full pl-[14rem]  h-[100vh]">
        <div className="flex-1">
          <div className="p-5 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-violet-900">
                Billing & invoices
              </h1>
              <h1 className=" font-bold text-gray-400">
                View all your invoices and receipts and make sure you you get
                paid on time
              </h1>
            </div>
            <div>

            <button className="bg-gray-200 p-1 rounded-xl font-bold text-gray-400" onClick={()=>handleshowdialog()}>edit mode</button>
              
              {/* <select  className="bg-violet-900 p-1 px-2 rounded-md cursor-pointer shadow-md font-bold text-white">
                <option value="volvo">english</option>
                <option value="volvo">arabic</option>
                <option value="saab">french</option>
              </select> */}
            </div>
          </div>

          <div className="flex flex-row  p-5 font-bold text-gray-400">
            <h1
              id="case"
              className="text-violet-900 border-b-2 border-violet-900 cursor-pointer"
            >
              All invoices
            </h1>
          </div>

          <div>
            <div className="bg-gray-200 rounded-xl  font-bold flex justify-between p-2 m-5 text-gray-400 px-5  ">
              <h1 className="text-sm">INVOICE ID</h1>
              <h1 className="text-sm">START DATE</h1>
              <h1 className="text-sm">END DATE</h1>
              <h1 className="text-sm">INVOICE AMOUNT</h1>
              <h1 className="text-sm">STATUS</h1>
            </div>
          </div>
              
          <div className="p-4">
            {dbinvoices &&
              dbinvoices.map((invoice, index) => (
                <>
                <div >
                  <Invoice invoice={invoice} key={index} dialogshowed={dialogshowed} />
                </div>
                {dialogshowed?<>
                <div className="absolute bg-white rounded-md  shadow p-1 flex">
                    <Link  to={`/${invoice.id}`}>
                    <button className="text-gray-900 hover:text-gray-400 font-bold p-1">Print</button>
                    </Link>
                    <button  className="text-gray-900 hover:text-gray-400 font-bold p-1">edit</button>
                    <button
                    onClick={()=>handleDeleteInvoice(invoice.id)}
                     className="text-gray-900 hover:text-gray-400 font-bold p-1">delete</button>
                  
                </div></>:<></>}
                </>
              ))}
          </div>
        </div>
      </div>
    );
}