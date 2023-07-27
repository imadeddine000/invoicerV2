import { useState, useContext } from "react";
import { invoicesContext,invoiceToAddContexte } from "renderer/InvoicesContexte";
import InvoiceItem from "renderer/components/InvoiceItem";
import more from '../../../assets/more.png'
import { ipcRenderer } from "electron";

export default function Addinvoice(){  
    const {Invoices,setInvoices}=useContext(invoicesContext)
    const [price,setprice]=useState(0)
    
    const{invoiceToAdd,setinvoiceToAdd}=useContext(invoiceToAddContexte)
    const handleAddItem=()=>{
      
      let temp=<InvoiceItem price={price} setprice={setprice}  setinvoiceToAdd={setinvoiceToAdd} />
      setInvoices(Invoices=>[...Invoices,temp])
    }
     
    const handleAddInvoices=()=>{
      let generatedjoin=Math.floor(Math.random()*100000)
      console.log(invoiceToAdd,price)
      window.electron.ipcRenderer.sendMessage('put-data',{invoiceToAdd,price,generatedjoin})
      setinvoiceToAdd(
        {
          BillFrom:'',
          BillTo:'',
          RecipientEmail:'',
          BillTitle:'',
          IssuedOn:'',
          DueOn:'',
          amount:0,
          status:false,
          ItemsList:[],
        }
      )
      setInvoices([])
      setprice(0)
    }
    const handleDeleteItem=()=>{
      setInvoices((prev)=>(prev.slice(0,-1)))
    }
   
   
    
    
    
    
    return (
      <div className="flex-col flex-1 pl-[14rem] h-[100vh] ">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="font-bold text-gray-500 text-2xl p-4">
            <h1>Create New Invoice</h1>
          </div>

          <div className="flex flex-row  ">
            <div className="flex flex-col p-2">
              <h1 className="text-sm text-gray-400 font-bold p-1">BillFrom</h1>
              <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,BillFrom:e.target.value})}
              value={invoiceToAdd.BillFrom}
                className="bg-gray-100 outline-violet-900 w-[20rem] p-1 rounded-md text-md font-bold"
                type="text"
               
              />
            </div>
            <div className="flex flex-col p-2">
              <h1 className="text-sm text-gray-400 font-bold p-1">BillTo</h1>
              <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,BillTo:e.target.value})}
              value={invoiceToAdd.BillTo}
                className="bg-gray-100 outline-violet-900 w-[20rem] p-1 rounded-md text-md font-bold"
                type="text"
                
              />
            </div>
          </div>
          <div className="flex flex-col p-2 ">
            <h1 className="text-sm font-bold text-gray-400">Recipient Email</h1>
            <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,RecipientEmail:e.target.value})}
              value={invoiceToAdd.RecipientEmail}
              className="bg-gray-100 outline-violet-900 rounded-md w-[41rem] p-2 text-sm font-bold"
              type="email"
              
            />
          </div>
          <div className="flex flex-col p-2">
            <h1 className="text-sm font-bold text-gray-400">BillTitle</h1>
            <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,BillTitle:e.target.value})}
              value={invoiceToAdd.BillTitle}
              className="bg-gray-100 outline-violet-900 rounded-md w-[41rem] p-2 text-sm font-bold"
              type="email"
              
            />
          </div>
          <div className="flex p-2 ">
            <div className="p-2">
              <h1 className="text-sm font-bold text-gray-400">IssuedOn</h1>
              <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,IssuedOn:e.target.value})}
              value={invoiceToAdd.IssuedOn}
                className="bg-gray-100 outline-violet-900 w-[20rem] p-2 rounded-md font-bold text-gray-300"
                type="date"
               
              />
            </div>
            <div className="p-2">
              <h1 className="text-sm font-bold text-gray-400">Due On</h1>
              <input
              onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,DueOn:e.target.value})}
              value={invoiceToAdd.DueOn}
                className="bg-gray-100 outline-violet-900 w-[20rem] p-2 rounded-md  font-bold text-gray-300"
                type="date"
                
              />
            </div>
          </div>
        </div>
        
        <div className=" flex flex-col justify-center items-center ">
        <div className="p-4">
        <h1 className="font-bold text-gray-600 text-2xl ">invoice Items</h1>
        </div>
          {Invoices.map((item,index)=>(
            <div className="flex" key={index}>
            <div >
              {item}
            </div>
            </div>
          ))}
        </div>
        <div className=" flex justify-center space-x-10 p-2 items-center">
            <button className="font-bold text-violet-900" onClick={()=>handleAddItem()}>AddItem</button>
            <button className="font-bold text-violet-900" onClick={()=>handleDeleteItem()}>Delete One</button>
             <span className="text-violet-900 font-bold">paid?(check if yes)</span>
             <input
             onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,status:e.target.checked})}
              type="checkbox"  />
            <div className="flex font-bold text-gray-500 space-x-2 items-center">
                <h1>Total Amount </h1>
                <h1>
                  <input className="outline- w-20 h-10 rounded-xl text-center bg-gray-200" type="number" value={price} onChange={(e)=>setinvoiceToAdd({...invoiceToAdd,amount:e.target.value})} />
                </h1>
            </div>
        </div>
        <div className="flex justify-end pr-40 pt-20">
            <button 
            onClick={handleAddInvoices}
            className="bg-violet-900 p-2 px-10 font-bold text-white rounded-xl shadow-md">Add Invoice</button>
        </div>
      </div>
    );
}