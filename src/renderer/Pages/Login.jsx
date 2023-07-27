import invoice from '../../../assets/invoiceimg.jpg'

export default function Login({state,setstate}){
    const handleLogin=()=>{
        setstate(true)
    }
    return (
      <div className="p-20  ">
        <div className="flex flex-row  bg-violet-900 rounded-xl sahdow-md">
          <div>
            <img className="w-full h-full rounded-l-xl" src={invoice} />
          </div>
          <div className="p-20 h-full flex-1">
            <div className="font-bold text-3xl text-center bg-violet-900 text-white">
              Welcome to Invoicer
            </div>
            <div className="font-bold">
              <input
                className="bg-violet-900 p-2 border-b-2 outline-none w-60"
                type="text"
                placeholder="username or email"
              />
              <input
                className="bg-violet-900 p-2 border-b-2 outline-none w-60"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="bg-white p-2 px-2 rounded-md mt-4 text-xl font-bold text-violet-900 text-center">
              <button onClick={()=>handleLogin()}>Login</button>
            </div>
            <div className="text-sm font-bold border-b-2 pt-10 text-white">
              <a href="#">You don't have an account?</a>
            </div>
          </div>
        </div>
      </div>
    );
}