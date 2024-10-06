import React,{useEffect,useState} from 'react'
import style from '../uploadcsv/styleBs/containerx.module.css'
import deleteimage from '../imagesBs/Delete.png'
import deleteinformationimage from '../imagesBs/Delete_information.jpeg'
import deletesuccessfully from '../imagesBs/deletesuccessfully.png'
import saveimage from '../imagesBs/Save.jpeg'
import savesuccessfully from '../imagesBs/Save_successfully.png'
import updateimage from '../imagesBs/Update.png'
import updateinformationsuccessimage from '../imagesBs/Update_successfully.jpeg'
import warningimage from '../imagesBs/Waring.png'
const CommonDialogueBox = ({actionType,returnMessage,date,time,socialid,serviceRequestType ,open,sourceName ,notificationType,autoid,errormsg ,msgobject,statuscode ,messageArray}) => {

 
const [isFlexDisplay, setIsFlexDisplay] = useState(false);
const[openx ,setopenx]=useState(false)
const[headingTextColor,setheadingTextColor]=useState()
const[actionbuttoncolor,setactionbuttoncolor]=useState()
const[actionbuttonTextcolor,setactionbuttonTextcolor]=useState()
const[messtext,setmesstext]=useState()
const divStyle = {
    display: isFlexDisplay ? 'flex' : 'none',
    flexDirection: 'column',
    color: 'white',
    width: '100%',
    height: '3.5rem',
  };


const submitbt=(msg)=>{
  setopenx(false)
  {returnMessage && returnMessage({"returnactionType":msg})}
  setIsFlexDisplay(false)  
  
}

useEffect(() => {
    console.log("show msgdd",typeof(errormsg) ,errormsg ,messageArray)

    if(open === true){
        setIsFlexDisplay(true)
        setopenx(true)

        // if(messageArray !== null || messageArray !== undefined){
        //     let d = Object.entries(messageArray).map(([key, value]) => ({ key, value }))
        //     setmesstext(d)
        // }

        {messageArray &&   setmesstext(Object.entries(messageArray).map(([key, value]) => ({ key, value })))
       }

    }
    if(actionType == 'save'){
        setheadingTextColor('#008A00')
    }else if(actionType == 'delete' || actionType == 'alert'){
        setheadingTextColor('#FF3440')
    }else if(actionType == 'update'){
        setheadingTextColor('#FF8000')
    }

    if(notificationType === 'pre'){
        setactionbuttonTextcolor('black')

        setactionbuttoncolor('#C4C4C4')
    }else if(notificationType === 'post' || notificationType === 'alert'){
            setactionbuttoncolor('#ef5350')
            setactionbuttonTextcolor('white')
            setheadingTextColor('#008A00')
    }
}, [returnMessage,date,time,socialid,serviceRequestType ,open ,sourceName,notificationType ,errormsg])



  return (
     
    <div> <div className={openx ? style['opencustomdialoguebox'] :style['closedialoguebox']} >
      <div className={style.cusboxmessagebox} >
            <div className={style.cusboxfirstdiv}>
                    <div style={{flex:'20%',width:'100%' ,height:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <img
                        src={
                            notificationType === 'pre'
                            ? actionType === 'save'
                                ? saveimage
                                : actionType === 'update'
                                ? updateimage
                                : actionType === 'delete'
                                ? deleteimage
                                : null
                            : notificationType === 'post' && statuscode === 'success'
                            ? actionType === 'save'
                                    ? savesuccessfully
                                    : actionType === 'update'
                                    ? updateinformationsuccessimage
                                    : actionType === 'delete'
                                    ? deletesuccessfully
                                    : savesuccessfully
                            : notificationType === 'alert' ?
                                         warningimage
                                        :deleteinformationimage
                        }
                        style={{ width: '35px', height: '35px' }}
                        />

                       
                     </div>

                    <div style={{flex:'80%',width:'100%' ,height:'100%',color:headingTextColor
                ,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'start'}}>
                    {notificationType == 'pre' ?
                             <>
                            <span style={{fontSize:'1rem',width:'100%' ,color:'' ,fontWeight:'600' ,paddingLeft:'14px'}}>Do you want to <span style={{textTransform:'uppercase',fontSize:'1.1rem'}}>{actionType}</span></span> 
                                <span style={{fontSize:'1.5rem',width:'100%',fontFamily:'sans-serif',fontWeight:'650'}}>'{serviceRequestType} request record'</span></>:
                                notificationType == 'post' ?
                                statuscode=='success' ?
                             <>
                       <span style={{fontSize:'1rem',width:'100%' ,color:'#008A00' ,fontWeight:'600' ,paddingLeft:'14px'}}>'{serviceRequestType} request record'<span style={{textTransform:'uppercase',fontSize:'1.1rem'}}></span></span> 
                        <span style={{fontSize:'1.5rem',width:'100%',fontFamily:'sans-serif',fontWeight:'650'}}>{actionType} Successfully</span></>:
                      
                      <> <span style={{fontSize:'1rem',width:'100%' ,color:'red' ,fontWeight:'600' ,paddingLeft:'14px'}}>'{serviceRequestType} request record'<span style={{textTransform:'uppercase',fontSize:'1.1rem'}}></span></span> 
                        <span style={{fontSize:'1.5rem',width:'100%',fontFamily:'sans-serif',fontWeight:'650',color:'red'}}>{actionType} unsuccessful</span></>
                        
                        :notificationType == 'alert' ?
                         <>
                          {/* <span style={{fontSize:'1rem',width:'100%' ,color:'red' ,fontWeight:'600' ,paddingLeft:'14px'}}>'{serviceRequestType} request record'<span style={{textTransform:'uppercase',fontSize:'1.1rem'}}></span></span>  */}
                        <span style={{fontSize:'1.5rem',width:'100%',fontFamily:'sans-serif',fontWeight:'650',color:'red' ,marginLeft:'13rem'}}>Alert</span></>:null
                        
                    }</div>
            </div>
            <div className={style.cusboxmiddlediv}>

            </div>
            <div className={style.cusboxseconddiv}>
                    <div style={{display:'flex',width:'100%',height:"20%",justifyContent:'center'
                    ,alignItems:'center',textAlign:'center',fontSize:'1rem',color:'#847c7c',fontWeight:'600'}}>
                       {notificationType !== 'alert' ?  <span>with</span> :null}
                    </div>
                    <div style={{display:'flex',width:'100%',height:"80%",justifyContent:'center',alignItems:'center'}}>
                            <div style={{flex:'20%',width:'100%' ,height:'100%' ,display:'flex',justifyContent:'center',alignItems:'center'}}>
                            
                                  <img
                                    src={notificationType === 'pre'
                                            ? warningimage  
                                            : notificationType === 'post' && statuscode === 'success'
                                            ? actionType === 'save'
                                            ? savesuccessfully
                                            : actionType === 'update'
                                            ? updateinformationsuccessimage
                                            : actionType === 'delete'
                                            ? deletesuccessfully
                                            : savesuccessfully
                                        :notificationType === 'alert'?
                                            warningimage
                                        :deleteinformationimage}
                                    style={{width:'35px' ,height:"35px"}}
                                            />
                            </div>

                            <div style={{flex:'80%',width:'100%' ,height:'100%' ,backgroundColor:''
                        ,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',textAlign:'start' ,fontSize:'0.9rem'}}>

                                 
                                     {notificationType !== 'alert' ?   <>
                                        <div style={{display:'flex', backgroundColor:'',flexDirection:'column' ,gap:'3px' ,height:'100%' ,width:'100%' ,padding:'1px' ,margin:'10px 0px'}}>
                                        {messtext && messtext.map((item)=>{
                                          return  <span > <span style={{color:'#100775'}}>{item.key} :</span> {item.value}</span>
                                        })}
                                        </div>
                                        </>


                                       :<div style={{width:'100%',backgroundColor:''}}> {errormsg && <span>Message : <span style={{color:'#b70505' ,fontWeight:'600' ,fontSize:'14px' , backgroundColor:''}}>{errormsg}</span></span>}</div>
                                   
                                    }






                                       
                            </div>
                    </div>
            </div>
            <div className={style.cusboxthirddiv}>
                <div style={{display:'flex',color:"white" ,justifyContent:'center',alignItems:'center' ,width:'100%',height:'100%',gap:'13px'}}>
                               
                                <div type="button" className={style.customdialgurboxbtn}
                                style={{backgroundColor:actionbuttoncolor ,color:actionbuttonTextcolor}}
                                onClick={() => {submitbt("close");}}
                            >


                                    {notificationType ==='post' || notificationType ==='alert'? 'Ok' : 'No'}</div>
                                
                            {notificationType === 'post' || notificationType === 'alert' ? <div></div> :  <div type="button"
                                style={{backgroundColor:'#ef5350' ,color:'white'}}

                                onClick={() => {submitbt("submit");}}
                                className={style.customdialgurboxbtn}>Yes</div>} 
                    </div>
            </div>

      
      </div>
         </div>

        {/* {openx &&  <div className={ openx ?  style['blur_background_on'] : style['blur_background_off'] }></div>} */}
             {openx &&   <div className={ style.blur_background_on}></div> }
       
    
    </div>

  )
}



export default CommonDialogueBox