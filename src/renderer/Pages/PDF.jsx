import React, { useEffect, useState,useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { useParams } from 'react-router-dom';

export const PDF = () => {
  const componentRef = useRef();
  const [itemToPrint, setitemToPrint] = useState([]);
  const [singleitem, setSingleitem] = useState();
  window.electron.ipcRenderer.once('get-by-id', (arg) => {
    setitemToPrint(arg);
    setSingleitem(arg[0]);
  });

  const id = useParams().id;

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-by-id', id);
  }, []);

  return (
    <div className="flex flex-col w-full pl-[14rem]  h-[100vh] items-center ">
      
      <div className="bg-white shadow p-4 w-[21cm] h-auto" ref={componentRef}>
        {!singleitem ? (
          <div>loading ...</div>
        ) : (
          <div className="font-bold p-2">
            <div className="border-b-2 border-gray-100">
              <h1 className="text-3xl">
                Invoice
                <span className="text-blue-500">#{singleitem.invoice_id}</span>
              </h1>
              <div className="font-xl text-gray-200">{singleitem.title}</div>
            </div>
            <div className='flex flex-row justify-between'>
            <div className="flex flex-col">
              <div className="p-4">
                <h1>BillFrom:</h1>
                <h1>{singleitem.billfrom}</h1>
              </div>
              <div className="p-4">
                <h1>DueOn:</h1>
                <h1>{singleitem.end_date}</h1>
              </div>
              
            </div>
            <div className="flex flex-col">
              <div className="p-4">
                <h1>IssuedOn:</h1>
                <h1>{singleitem.start_date}</h1>
              </div>
              <div className="p-4">
                <h1>BillTo:</h1>
                <h1>{singleitem.billto}</h1>
              </div>
            </div>
            </div>
            
          </div>
        )}
        <div className='font-bold text-gray-200 text-2xl p-2 border-b-2'>
          Invoice Details
        </div>
        <table className='bg-white shadow font-bold text-sm text-gray-500 w-full rounded-xl p-4 mt-4 overflow-hidden'>
          <thead className='border-b-2 bg-gray-100 overflow-hidden'>
            <td>Description</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Amount</td>
          </thead>
          <tbody className=' w-full'>
            
          {itemToPrint &&
          itemToPrint.map((item, index) => (
            <tr className="  font-bold">
              <td>{item.name}</td>
              <td>{item.price} DA</td>
              <td>{item.qty}</td>
              <td>{item.price*item.qty} DA</td>
            </tr>

          ))}
          </tbody>
          <tfoot className='bg-gray-100 overflow-hidden'>
            <td className='text-black text-xl'>Total:</td>
            <td></td>
            <td></td>
            <td>{!singleitem?<>loading... </>:singleitem.invoice_amount} DA</td>
          </tfoot>
        </table>
        <div className='flex justify-end p-4'>
            <div >
              <button></button>
            </div>
        </div>
        
      </div>
     <div className='fixed right-2 top-2'>
     <ReactToPrint
        trigger={() => <button className='bg-blue-600 p-2 rounded-xl text-center font-bold w-fit px-10 text-white cursor-pointer'>Print</button>}
        content={() => componentRef.current}
      
      />
     </div>
    </div>
  );
};
