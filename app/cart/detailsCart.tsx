'use client'
import { Button } from "antd";
import { Butterfly_Kids } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getStoreAll, urlBackend } from "../api/fetchApi";

export default function DetailsCart({ Details }: {
    Details: any[]
}) {
    const [cartItems, setCartItems] = useState<any[]>([]); // State to hold cart items
    const [data,setData]=useState([])


    useEffect(() => {
      const fetchCartItems = () => {
        // Retrieve cart items from Local Storage
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems)); // Parse and set in state
        }
      };
      const fetchApi=async()=>{
        const resp=await getStoreAll();
        if(resp.message=="Thành công !"){
             setData(resp.content)
        }
       
    }
    fetchApi()
      fetchCartItems();
    }, []); // Empty dependency array means this runs once when the component mounts
    const deleteItem = (id: any) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
      
        // Access the updated cartItems after the state update happens
        // (using a callback function inside setCartItems)
        setCartItems((updatedCartItems) => {
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          return updatedCartItems; // Return the updated state for consistency
        });
      };
    // Group items by store_id
    const groupedItems = cartItems.reduce((acc: any, item) => {
        const { store_id } = item;
        if (!acc[store_id]) {
          acc[store_id] = [];
        }
        acc[store_id].push(item);
        return acc;
      }, {});
      console.log(groupedItems);
      const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    return (
        <>
        {/* {Details.map((items, index) => (
            <div className="w-full flex flex-col  bg-white rounded-md ">
                
                    <div className=" flex flex-row my-7 ml-8 items-center gap-3">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                        <span className="text-base font-normal"> {items.name}</span>
                        <div className=" bg-beamin p-1 rounded-md">
                            {items.quandoitac && (
                                <span className="text-sm font-normal text-white">
                                    Quán đối tác
                                </span>
                            )}
                        </div>
                    </div>
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                            {items.items.map((item: any, index: any) => (
                                <div key={index} className={index === items.items.length - 1 ? "w-full grid grid-cols-12" : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"}
                                >
                                    <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                                        <div className="relative h-36 w-36">
                                            <Image layout="fill" objectFit="cover" src={item.img} alt={""} />
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="text-base ">{item.namefood}</span>
                                            <span className="text-sm text-gray-600">{item.description}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        ₫{item.price}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <input type="number" id="quantity" className="w-16 text-center border border-gray-300 rounded" defaultValue={item.quantity} min="1" max="100" />

                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        ₫{item.totalprice}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <span className=" hover:text-red-600 cursor-pointer">Xóa</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                       
                
            </div>
            ))} */}
            
            {Object.keys(groupedItems).length > 0 ? (
        Object.keys(groupedItems).map((storeId) => (
          <div key={storeId}>
        
            <div className="w-full flex flex-col  bg-white rounded-md ">
                
                    <div className=" flex flex-row my-7 ml-8 items-center gap-3">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                        <span className="text-base font-normal"> {data.map((item:any)=>item.id==storeId ? item.name : "")}</span>
                        {/* <div className=" bg-beamin p-1 rounded-md">
                            {groupedItems.quandoitac && (
                                <span className="text-sm font-normal text-white">
                                    Quán đối tác
                                </span>
                            )}
                        </div> */}
                    </div>
                    <div className=" w-full border-t border-b border-solid border-gray-600 py-3">
                            {groupedItems[storeId].map((item: any, index: any) => (
                                <div key={index} className={index === groupedItems.length - 1 ? "w-full grid grid-cols-12" : "w-full grid grid-cols-12 border-b border-solid border-x-gray-300"}
                                >
                                    <div className="pl-8  col-span-4 flex items-center flex-row gap-3">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800 " />
                                        <div className="relative h-36 w-36">
                                        <img src={`${urlBackend}/img/${item.image_url}`} style={{objectFit:"cover",width:"100%",height:"100%"}} alt="s"/> 
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <span className="text-base ">{item.namefood}</span>
                                            <span className="text-sm text-gray-600">{item.description}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        ₫{item.price}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <input type="number" id="quantity" 
                                        
                                        
                                        className="w-16 text-center border border-gray-300 rounded" defaultValue={item.quantity} min="1" max="100" />

                                    </div>
                                    <div className="col-span-2 flex items-center justify-center flex-row gap-3">{item.quantity*item.price}
                                        ₫{item.totalprice}
                                    </div>
                                    <div
                                    onClick={()=>{deleteItem(item.id)}}
                                    className="col-span-2 flex items-center justify-center flex-row gap-3">
                                        <span className=" hover:text-red-600 cursor-pointer">Xóa</span>
                                    </div>

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