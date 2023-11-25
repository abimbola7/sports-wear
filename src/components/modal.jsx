"use client"
import React from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "@/store/modalSlice";
import { createPortal } from "react-dom";
import { doc, getDoc, query} from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";
import { oswald, montserrat } from "@/app/layout";
import CartBtn from "./cart-btn";
import { LiaTimesSolid } from "react-icons/lia";
import { fetchCart } from "@/store/cartSlice";
import { useSession } from "next-auth/react";
import AddCart from "./addCart";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ id, setIds, amount}) {
  const { data } = useSession();
  const dispatch = useDispatch();
  const amountRef = React.useRef();
  const [ mounted, setMounted ] = React.useState(false);
  const [ productData, setProductData ] = React.useState(null);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const closeModal = () => {
    setProductData(null)
    setIds(null)
    dispatch(modalActions.toggleModal());
    document.body.style.overflow = 'auto';
  };

  const addToCart = () => {
    dispatch(fetchCart({
      uid:data?.user?.uid, 
      item:{
        id : productData.id,
        name : productData.name,
        price : productData.price,
        imageUrl : productData.imageUrl,
        amount : +amountRef.current.value
      }, 
      type : "PRODUCT"
    }));
  };

  React.useEffect(() => setMounted(true), []);

  React.useEffect(()=> {
    const fetchProduct = async () => {
      setIsLoading(true)
      if (id) {
        const eventRef = doc(db, 'products', id);
        await getDoc(eventRef)
        .then(querySnaphot => {
          setProductData({...querySnaphot.data(), id:querySnaphot.id})
          setIsLoading(false);
        }) 
      }
    }
    fetchProduct()
  }, [id])


  return (
    mounted ?
     createPortal(
     <AnimatePresence>
      {!isLoading ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden outline-none focus:outline-none"
          >
            <motion.div
            initial={{
              y : -500,
            }}
            animate={{
              y : 0,
            }}
            exit={{
              y : -1000
            }}
            transition={{
              type : "spring",
              stiffness : 80
            }}
             className="relative w-[70rem] my-6 mx-auto max-w-[85%] pt-16 sm:pt-0">
              {/*content*/}
              <div className={`shadow-lg relative w-full bg-[#F7F7F7] outline-none focus:outline-none grid grid-cols-1 sm:grid-cols-2 ${ montserrat.className } mt-32 sm:mt-0`}>
                <div
                onClick={closeModal}
                className="absolute p-2 cursor-pointer bg-[#F7F7F7] rounded-full text-sm -right-3 -top-4 shadow-2xl">
                  <LiaTimesSolid />
                </div>
                <div className="">
                  <Image
                  src={productData.imageUrl}
                  alt="product"
                  width={600}
                  height={400}
                  placeholder='blur'
                  blurDataURL='/spinner.svg'
                  />
                </div>
                <div className="flex flex-col p-6 space-y-2  text-customBlack">
                  <p>{ productData.category }</p>
                  <h1 className={`${ oswald.className } font-medium text-3xl`}>{ productData.name }</h1>
                  <p className="text-2xl font-bold text-textGray">${ productData.price.toFixed(2) }</p>
                  <p>{ productData.description }</p>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 sm:items-center justify-start sm:!mt-5 max-w-sm pb-2 flex-wrap">
                  <CartBtn
                  amount={productData?.amount}
                  ref={amountRef}
                  />
                  <AddCart onAdd={addToCart}/>
                  </div>
                  <div className="flex flex-col pt-2 text-sm border-t sm:flex-row sm:space-x-3 sm:items-center">
                    <div className="">Category: {" "} <span>{ productData.category }</span></div>
                    <div>
                      Tags: {" "} 
                      <span>{ productData.tags.join(", ") }</span>
                    </div>
                    {/* {
                      tags.map(tag=>)
                    } */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
          key={"modal"}
          initial={{
            opacity: 0
          }} 
          animate={{
            opacity: .5
          }}
          exit={{
            opacity : 0
          }}
          className="fixed inset-0 z-40 overflow-y-auto bg-black"
          ></motion.div>
        </>
      ) : null}
    </AnimatePresence>, document.body): null
  )
}