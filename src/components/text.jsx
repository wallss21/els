import React from "react";

export function Text({ data, moreClass,fs=null }) {
  return <p className={`leading-6 tracking-wide font-light fw-400 ${fs===null?"fs-14":fs} font-mont ${moreClass} `}>{data}</p>;
}

export 
function Title({color=null,title,fw,text_s}) {


  return (<h3 className={`${fw===undefined?"fw-600":fw} ${text_s===undefined? "text-12":text_s} letspacing-1 font-mont ${color?color:"text-[#282828]"}`}>{title}</h3>  )
}


export  function Button({ title, onClicked=()=>{}}) {
    return (
      <button onClick={onClicked}
       className="inline-flex text-white mt-8 py-[1.1rem] px-10 bg-[#282828] font-medium text-sm">
        {title}
      </button>
    );
  }
