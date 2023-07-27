import checkyes from '../../../assets/checkyes.png'
import checkno from '../../../assets/checkno.png'


export default function Invoice({invoice,dialogshowed}){
 
    return (
      <>
        <div >
          <div>
            <div
              id="invoice"
              className="flex flex-row justify-between    p-4 items-center bg-white border-b-2 border-gray-200 font-bold text-violet-900"
            >
              <h1>{'#'+invoice.id}</h1>
              <h1>{invoice.start_date}</h1>
              <h1>{invoice.end_date}</h1>
              <h1>{invoice.invoice_amount+'DA'}</h1>
              <span className="">
                <img className='w-5 h-5' src={invoice.status?checkyes:checkno}/>
             
              </span>
            </div>
          </div>
        </div>
        
      </>
    );
}