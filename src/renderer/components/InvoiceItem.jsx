
import { useState,useContext } from 'react';
import { invoicesContext,invoiceToAddContexte } from 'renderer/InvoicesContexte';

export default function InvoiceItem({setprice,price,id,handleDI,setReturnedItems,ReturnedItems}){
  const [Item, setItem] = useState({Name:'',Price:0,Qty:0});
  let inputprice=Item.Price*Item.Qty
  const {Invoices,setInvoices}=useContext(invoicesContext)
  const {invoiceToAdd,setinvoiceToAdd}=useContext(invoiceToAddContexte)
  function handleSetPrice(){
      setprice(price+inputprice) 
    }
    
    const handleChecked=(x)=>{
      if(x){
        setinvoiceToAdd({...invoiceToAdd,ItemsList:[...invoiceToAdd.ItemsList,Item]})
      }
      else{}
    }

  
    return (
      <div className="flex flex-1 items-center">
        <div className="flex flex-row   items-center space-x-10">
          <div className="flex flex-col p-2">
            <span className="font-bold text-gray-800 text-sm">Name</span>
            <input className="p-2 bg-gray-100 rounded-md outline-violet-900 " type="text" onChange={(e)=>{setItem({...Item,Name:e.target.value})}} />
          </div>
          <div className="flex flex-col p-2">
            <span className="font-bold text-gray-800 text-sm">Price</span>
            <input className="p-2 bg-gray-100 rounded-md w-20 outline-violet-900  " type="number"  onChange={(e)=>{setItem({...Item,Price:e.target.value})}} />
          </div>
          <div className="flex flex-col p-2">
            <span className="font-bold text-gray-800 text-sm">Qty</span>
            <input className="p-2 bg-gray-100 rounded-md w-20 outline-violet-900" type="number" onChange={(e)=>{setItem({...Item,Qty:e.target.value})}} />
          </div>
          <div className="flex flex-col p-2">
            <span className="font-bold text-gray-800 text-sm">TotalPrice</span>
            <input className="p-2 bg-gray-100 rounded-md w-20 outline-violet-900" type="number"  defaultValue={0} readOnly value={inputprice} onInput={handleSetPrice()}  />
          </div>
          <div className='flex  items-center justify-center'>
            <input type="checkbox" onChange={(e)=>handleChecked(e.target.checked)}/>
          </div>
          
        </div>
       
      </div>
    );
}