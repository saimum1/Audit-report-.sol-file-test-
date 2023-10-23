import React, { useEffect, useState } from 'react'
import style from '../styleBs/container.module.css';

const Previewreport = ({data,gettd}) => {

const[datax,setdata]=useState(data[0]? data[0] :[])
useEffect(() => {



  console.log("showinf data" ,datax)

}, [data])

const savedata=()=>{
  gettd(true)
}

  return (
    <div style={{display:'flex',flexDirection:'column' ,justifyContent:'',alignItems:'center' ,height:"100vh",paddingTop:"4rem"}}>
    <div style={{width:"90%" ,backgroundColor:"",padding:'12px',display:'flex',justifyContent:'space-between',height:'4rem'}}>  
    <span style={{color:'#C84745'}}>Audit Report</span> 
     <span></span></div>
    
    <div style={{display:'flex',alignItems:'center' ,flexDirection:'column',width:"90%" ,height:'45%' ,backgroundColor:"",border:'1px solid #E9E9E9',gap:'2%'}}>

        <div style={{width:"100%",height:'2rem' ,backgroundColor:'#F2F2F2',display:"flex" ,justifyContent:'center',alignItems:'center' ,gap:'0%' ,fontSize:'12px'}}>
           <div style={{backgroundColor:'' ,width:'1rem' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',paddingLeft:'30px'}}></div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>category</div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>issue</div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>suggestions</div>
        
            

        </div>
  
      <div  style={{width:"100%",height:'100%',overflow:'auto' ,backgroundColor:'' ,justifyContent:'center' ,alignItems:'center'}}>

        {datax.length > 0 ? datax.map((item,index)=>{
            return(<>
         <div style={{width:"100%",height:'2rem' ,backgroundColor:'',display:"flex" ,justifyContent:'center',alignItems:'center' ,gap:'0%' ,fontSize:'12px'}}>
           <div style={{backgroundColor:'' ,width:'1rem' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',paddingLeft:'30px'}}>{index + 1}.</div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>{item?.category}</div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}>{item?.issue}</div>
           <div style={{flex:"1" ,backgroundColor:'' ,width:'100%' ,height:"100%" ,display:"flex" ,justifyContent:'center',alignItems:'center',textAlign:'left'}}>{item?.suggestions[0]}</div>

        </div>
         <div style={{backgroundColor:'#F2F2F2' ,width:'98%' ,height:"1px" ,display:"flex" ,justifyContent:'center',alignItems:'center'}}></div>
         </> )
        }) : <div style={{width:"100%",height:'100%' ,backgroundColor:'',display:'flex' ,justifyContent:'center' ,alignItems:'center',color:'#826161'}} > history is empty !</div>}

    </div> 




    </div>

<div style={{width:'80%' ,backgroundColor:'',height:'2rem' ,marginTop:'1rem',display:'flex' ,justifyContent:'flex-end' ,alignItems:'center'}}>
<div className={style.prevbtn} style={{ backgroundColor:'#ff7370' }} onClick={()=>savedata()}  ><span  >save</span></div>

</div>
    

    
</div>
  )
}

export default Previewreport