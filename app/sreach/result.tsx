'use client'
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSearchStore } from '../api/fetchApi';

export default function ResultFood({ items }: { items: any[] }) {
    const router = useRouter();
    const searchParams:any=useSearchParams()
    const nameProduct=searchParams.get("key")
    const [data,setData]=useState([]);
    const [page,setPage]=useState(1)
    const [totalProduct,setTotalProduct]=useState(0);
    console.log(totalProduct);
    
    // getSearchProduct
    useEffect(()=>{
        const fetchApi=async()=>{
            const resp=await getSearchStore(nameProduct,page);
            if(resp.message=="Thành công !"){
                 setData(resp.content.findPage)
                 setTotalProduct(resp.content.total)
            }
           
        }
        fetchApi()
    },[nameProduct,page])
    const handlePageChange = (newPage:number) => {
        setPage(newPage); // Cập nhật trang hiện tại
    };

    
    const handleNavigate = (id:any) => {
        router.push(`/detailfood?id=${id}`);
    };
    return (
        <>
            <div className='mt-3 flex flex-row flex-wrap gap-3 '>
                {data.map((item:any)=>(
                <div onClick={()=>{handleNavigate(item.id)}} key={item.id} className='group w-[19%] h-56 bg-white flex flex-col cursor-pointer'>
                    <div className='group-hover:brightness-105 w-full h-[60%] relative'>
                    <img src="/images/Ga.png" className='w-[100%] h-[100%]' alt={item.description} />
                    </div>
                    <div className='group-hover:bg-slate-50 w-full h-[40%] pr-3  border border-solid'>
                        <div className="ml-3  w-full truncate text-base h-[30%] ">
                            <span className='font-bold text-[#252525]'> {item.name} </span>
                        </div>
                        <div className="ml-3 w-full truncate text-sm  h-[30%]" style={{ color: '#959595' }}>
                            <span>{item.address}</span>
                        </div>
                        <div className=" flex items-center w-full text-sm border-t  border-beamin-50  h-[30%]">
                            <span className="ml-3 ">Quán ăn</span>
                        </div>
                    </div>
                </div>
                ))}
            </div>

            <div className='flex justify-center mt-4'>
                {[...Array(totalProduct)].map((_, index) => (
                    <button 
                        key={index} 
                        className={`mx-1 px-4 py-2 border rounded ${page === index + 1 ? 'bg-[#3AC5C9] text-white' : 'bg-gray-200 text-black'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    
                    </button>
                ))}
            </div>
        </>

    )

}