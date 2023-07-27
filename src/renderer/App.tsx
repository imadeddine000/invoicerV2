import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

import Main from './Pages/Main';
import Addinvoice from './Pages/Addinvoice';
import { useState } from 'react';
import Login from './Pages/Login';
import Sidebar from './components/Sidebar';
import { invoicesContext,invoiceToAddContexte } from './InvoicesContexte';
import { PDF } from './Pages/PDF';

export default function App() {
  const [Invoices, setInvoices] = useState([])
  const [invoiceToAdd, setinvoiceToAdd] = useState({
    BillFrom:'',
    BillTo:'',
    RecipientEmail:'',
    BillTitle:'',
    IssuedOn:'',
    DueOn:'',
    amount:0,
    status:false,
    ItemsList:[],
  })
  return (
   <>
   <Router> 
        <Sidebar/> 
        <invoicesContext.Provider value={{Invoices,setInvoices}}>
          <invoiceToAddContexte.Provider value={{invoiceToAdd,setinvoiceToAdd}}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<Addinvoice />} />
        <Route path='/:id' element={<PDF/>}/>
      </Routes>
      </invoiceToAddContexte.Provider>
      </invoicesContext.Provider>
    </Router>

   </>
  );
}
