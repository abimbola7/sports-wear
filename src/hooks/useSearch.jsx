import { collection, getDocs, query, where } from "firebase/firestore";
import React from  "react";
import { db } from "../../firebase";

export const useSearch = (data) => {
  const [isLoading, setIsLoading] = React.useState()
  const [error, setError] = React.useState(null)
  const [products, setProducts] = React.useState(null)
  console.log(+data.maxValue)

  const fetchSearchData  = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const queryByName = query(collection(db, "products"), where("name", ">=", data.searchTerm.toLowerCase() || data.searchTerm.toUpperCase(), where('price', '>', +data.minValue), where('price', '<', +data.maxValue)));
      const queryByCategory = query(collection(db, "products"), where('category', 'array-contains', data.searchTerm.toLowerCase() || data.searchTerm.toUpperCase(), where('price', '>', +data.minValue), where('price', '<', +data.maxValue))); 
      const queryByTags = query(collection(db, "products"), where('tags', 'array-contains', data.searchTerm.toLowerCase() || data.searchTerm.toUpperCase()), where('price', '<', +data.maxValue), where("price", ">", +data.minValue));

      const nameQuerySnapshot = await getDocs(queryByName);
      const categoryQuerySnapshot = await getDocs(queryByCategory);
      const tagsQuerySnapshot = await getDocs(queryByTags);

      if (tagsQuerySnapshot.empty && nameQuerySnapshot.empty && categoryQuerySnapshot.empty ) { 
        throw new Error("Cannot Find Item")
      }else {
        const nameData = nameQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const categoryData = categoryQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        const tagsData = tagsQuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        console.log(tagsData)
        setProducts([...nameData, ...categoryData, ...tagsData]);
      }
    } catch (error) {
      console.log(error)
      setError("Something went wrong")
      // return rejectWithValue(error.message)
    }finally {
      setIsLoading(false)
    }
  }

  const memoizedFetchData = React.useCallback(fetchSearchData, [data.searchTerm, data.maxValue, data.minValue]);
  React.useEffect(()=> {
    memoizedFetchData()
  }, [memoizedFetchData])

  console.log(isLoading)
  return {
    isLoading,
    error,
    products
  }
}