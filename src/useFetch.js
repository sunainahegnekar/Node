import { useState,useEffect } from "react";

const useFetch = (url) => {

    const [Data,setData] = useState(null);
    const [isPending,setPending] = useState(true);
    const [error,seterror] = useState(null);
    
    useEffect((blogs) => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url,{signal:abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch the data");
            }
            return res.json();
        })
        .then(data =>{
            setData(data);
            setPending(false);
            seterror(null);
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log("fetch aborted");
            }
            else{
                seterror(err.message);
                setPending(false);
            }
            
        })
        }, 1000);

        
    },[url]);

    return{Data,isPending,error};
}

export default useFetch;