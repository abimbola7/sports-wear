import { collection, getDocs, query, where } from "firebase/firestore";
import React from  "react";
import { db } from "../../firebase";

export const useFetchType = (data) => {
  console.log(data)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [products, setProducts] = React.useState(null)
  const fetchData  = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const q = query(collection(db, "products"), where('category', 'array-contains', data));
      const querySnaphot = await getDocs(q)
      if (querySnaphot.empty) {
        throw new Error("Something went wrong");
      }
      const newData = querySnaphot.docs.map(doc=>(
        {
          ...doc.data(), id:doc.id
        }
      ))
      setProducts(newData);

    } catch(error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false)
    }
  }
  const memoizedFetchData = React.useCallback(fetchData, [data]);
  
  React.useEffect(()=> {
    memoizedFetchData()
  }, [memoizedFetchData])
  return { isLoading, products, error, memoizedFetchData}
}