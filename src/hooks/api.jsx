import { collection, getDocs, query, where } from "firebase/firestore";
import React from  "react";
import { db } from "../../firebase";

export const useFetchType = (data) => {
  console.log(data)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [products, setProducts] = React.useState(null)
  React.useEffect(()=> {
    const fetchData  = async () => {
      setIsLoading(true)
      const q = query(collection(db, "products"), where('category', 'array-contains', data));
      await getDocs(q)
      .then(querySnaphot => {
        const newData = querySnaphot.docs.map(doc=>(
          {
            ...doc.data(), id:doc.id
          }
        ))
        console.log(newData)
        setProducts(newData);
        setIsLoading(false);
      })
    }
    fetchData();
  }, [data])
  return { isLoading, products, error }
}