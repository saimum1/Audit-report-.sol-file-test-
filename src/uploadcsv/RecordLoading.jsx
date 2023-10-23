import React,{useEffect,useState} from 'react'
import style from '../styleBs/container.module.css';



const RecordLoading = ({isloading ,loadingtype ,loadingtext}) => {


const[dataloadingtext,setdataloadingtext]=useState('loading....')
const[processingtext,setprocessingtext]=useState('Processing')
const[datasavingtext,setdatasavingtext]=useState('Saving....')
const[customtext,setdcustomtext]=useState('')

useEffect(() => {

  if(loadingtype === 'save'){
    setdcustomtext(datasavingtext)
  }else if(loadingtype === 'loading'){
    setdcustomtext(dataloadingtext)
  }

}, [isloading ,loadingtype ,loadingtext])


  return (
 <div className={isloading ? style['recordloadingboxON'] :style['recordloadingboxOFF']} >
      <div className={style.recordloadingCustomBox} >
            
          
            <div className={style.cusboxseconddiv} style={{flex:'100%'}}>
                   
                    <div style={{display:'flex',width:'100%',height:"100%",justifyContent:'flex-start',alignItems:'flext-start',textAlign:"center",paddingLeft:'8%'}}>
                            <div style={{flex:'10%',width:'100%' ,height:'100%' ,display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                                          <div class={style.load_wrapp}>
                                  
                                            <div class={style.load_4}>
                                              
                                                <div class={style.ring_1} style={{color:'#f22e2e',}}></div>
                                            </div>  

                                          </div>
                                 
                            </div>

                            <div style={{flex:'90%',width:'100%' ,height:'100%' 
                             ,display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',textAlign:'start' ,fontSize:'2rem'}}>

                                 
                                  <div className={style.customloadingsecond}>
                                {loadingtext &&     <span style={{fontSize:'1.5rem',color:'#f45d5a' ,width:"100%" ,paddingRight:'18px' ,paddingLeft:'12px'}}>{loadingtext && loadingtext} </span>}

                                      <span style={{fontSize:'1.1rem',color:'red' ,textShadow: '1px -1px 5px black',width:"100%"}}></span>
                              </div>
                            </div>
                    </div>
                 
            </div>
             

      
      </div>
         </div>
           


    
    
  )
}

export default RecordLoading






    //  <div className={ isloading === true ?   style['loadingscreenContaineron'] :style['loadingscreenContaineroff']} >
   
    // <div className={style.customloadingdiv} >
    //       <div className={style.customloadingfirst}>
    //                <div class={style.load_wrapp}>
    //                    {isloading &&
    //                 <div class={style.load_4}>
                      
    //                     <div class={style.ring_1} style={{color:'#f22e2e',}}></div>
    //                 </div>  } 

    //                 </div>
    //       </div>
    //       {customtext && 
    //       <div className={style.customloadingsecond}>
    //           {loadingtext &&     <span style={{fontSize:'1.2rem',color:'red' ,textShadow: '1px -1px 5px black',width:"100%"}}>{loadingtext && loadingtext}</span>}

    //               <span style={{fontSize:'1.2rem',color:'red' ,textShadow: '1px -1px 5px black',width:"100%"}}>{customtext}</span>
    //       </div>
    //       }
    
    // </div>
    //    </div>