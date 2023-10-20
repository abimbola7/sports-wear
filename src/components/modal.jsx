"use client"
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "@/store/modalSlice";
import { createPortal } from "react-dom";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";
import { oswald, montserrat } from "@/app/layout";
import CartBtn from "./cart-btn";
import { LiaTimesSolid } from "react-icons/lia";

export default function Modal({ id, setIds}) {
  const dispatch = useDispatch();
  const showModal = useSelector(state=>state.modal.isToggled);
  const [ mounted, setMounted ] = React.useState(false);
  const [ productData, setProductData ] = React.useState(false);
  const { name, imageUrl, description, price, category, tags } = productData
  const [ isLoading, setIsLoading ] = React.useState(false);

  const closeModal = () => {
    setIds(null)
    dispatch(modalActions.toggleModal());
    document.body.style.overflow = 'auto';
  };

  React.useEffect(() => setMounted(true), []);

  React.useEffect(()=> {
    const fetchProduct = async () => {
      setIsLoading(true)
      if (id) {
        const eventRef = doc(db, 'products', id);
        await getDoc(eventRef)
        .then(querySnaphot => {
          setProductData(querySnaphot.data())
          setIsLoading(false);
        }) 
      }
    }
    fetchProduct()
  }, [id])


  return (
    mounted ?
     createPortal(
     <>
      {!isLoading ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden fixed inset-0  z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[70rem] my-6 mx-auto max-w-[85%] pt-16 sm:pt-0">
              {/*content*/}
              <div className={`shadow-lg relative w-full bg-[#F7F7F7] outline-none focus:outline-none grid grid-cols-1 sm:grid-cols-2 ${ montserrat.className } mt-32 sm:mt-0`}>
                <div
                onClick={closeModal}
                className="absolute p-2 cursor-pointer bg-[#F7F7F7] rounded-full text-sm -right-3 -top-4 shadow-2xl">
                  <LiaTimesSolid />
                </div>
                <div className="border">
                  <Image
                  src={imageUrl}
                  alt="product"
                  width={600}
                  height={400}
                    />
                </div>
                <div className="border flex flex-col space-y-2 p-6 text-customBlack">
                  <p>{ category }</p>
                  <h1 className={`${ oswald.className } font-medium text-3xl`}>{ name }</h1>
                  <p className="font-bold text-2xl text-textGray">${ price.toFixed(2) }</p>
                  <p>{ description }</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center justify-start sm:!mt-5 max-w-sm pb-2 flex-wrap">
                    <CartBtn />
                    <button className="uppercase font-semibold flex-1 py-2 tracking-wider text-sm bg-darkOrange rounded-3xl text-[#F7F7F7] px-3 mt-3">Add to Cart</button>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center border-t pt-2 text-sm">
                    <div className="">Category: {" "} <span>{ category }</span></div>
                    <div>
                      Tags: {" "} 
                      <span>{ tags.join(", ") }</span>
                    </div>
                    {/* {
                      tags.map(tag=>)
                    } */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
          className="opacity-50 inset-0 z-40 bg-black fixed overflow-y-auto"
          ></div>
        </>
      ) : null}
    </>, document.body): null
  )
}