'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { getStoreAll, urlBackend } from "../api/fetchApi";

export default function DetailsCheckout({ groupedItems,data }: { groupedItems: any,data:any }) {
 
    return (
        <>
        
            <div className="mt-3 ml-10 grid grid-cols-12">
         
             <div className="col-span-6" >Món Ăn</div>
                <div className="col-span-2" >Đơn giá </div>
                <div className="col-span-2" >Số Lượng </div>
                <div className="col-span-2" >Thành tiền</div>
           
           
            </div>
            {Object.keys(groupedItems).length > 0 ? (
        Object.keys(groupedItems).map((storeId) => (
          <div key={storeId}>
        
            <div className="w-full flex flex-col  bg-white rounded-md ">
                
                    <div className=" flex flex-row my-7 ml-8 items-center gap-3">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                        <span className="text-base font-normal"> {data.map((item:any)=>item.id==storeId ? item.name : "")}</span>
                      
                    </div>
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                            {groupedItems[storeId].map((item: any, index: any) => (
                              <div key={index} className="mt-4 ml-10 grid grid-cols-12">
                              <div className="col-span-6 flex flex-row items-center gap-3" >
                                  <div className="w-16 h-16 relative" > 
                                  <img src={`${urlBackend}/img/${item.image_url}`} style={{objectFit:"cover",width:"100%",height:"100%"}} alt="s"/> 
                                  </div>
                                  <div className="flex flex-col gap-1">
                                      <span className="text-base">{item.name}</span>
                                      <span className="text-sm text-gray-600">{item.description}</span>
                                  </div>
                              </div>
                              <div className="col-span-2 ml-1 flex items-center" >{item.price} </div>
                              <div className="col-span-2 ml-5 flex items-center " >{item.quantity} </div>
                              <div className="col-span-2 ml-5  flex items-center" >{item.quantity * item.price}</div>
                          </div>
                            ))}
                        </div>
                       
                
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
        
        </>

    )

}
