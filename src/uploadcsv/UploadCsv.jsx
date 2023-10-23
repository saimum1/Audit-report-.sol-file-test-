import React,{useState,useEffect} from 'react'
import style from '../styleBs/container.module.css';
import axios  from 'axios';
import Previewreport from './Previewreport';
import RecordLoading from './RecordLoading';


const UploadCsv = ({companyid,medianame}) => {

console.log("cmp333",companyid,medianame)
const[popmsggreen,setpopmsgreen]=useState(null)
const[popmsgred,setpopmsgred]=useState(null)
const[filename,setfilename]=useState('')
const[filextname,setfilextname]=useState('')
const[show,setshow]=useState(false)
const [reports,setreports]=useState([])
const[isready,setisready]=useState(true)
const[isloading,setisloading]=useState(false)
const[getdatta,setgetdatta]=useState('')

const getdatass=()=>{
    axios.get('/getalldata').then((res)=>{
        setgetdatta(res)
    }).catch((e)=>console.log(e))
}



useEffect(() => {
// getdatass()
}, [])





const callpopnotify =(msg)=>{
    if(msg.status === 1){setpopmsgreen(msg.msg)}else{setpopmsgred(msg.msg)}
    setTimeout(()=>{
        setpopmsgreen(null)
        setpopmsgred(null)
    },4000)
}


const openMonthlyReport = () => {
    document.getElementById("showMonthlyReport").style.width = "90%";
    document.getElementById("closeMonthlyReport").style.display = "flex";
    setshow(true)
    // this.setState({show: true})
}; 


const closeMonthlyReport = () => {
    document.getElementById("showMonthlyReport").style.width = "0";
    document.getElementById("closeMonthlyReport").style.display = "none";
    setshow(false)
}


  

const handlesubmitofcsv =()=>{
    console.log("csv33",csvjsonfile_filtered)
if(immarea !== null){
    if(csvjsonfile !== null){
        if(imported_template != null){
            if(err === false){
                console.log("apiname",apiname)
                let csvobject={
                    'companyId':'companyId',
                    'userId':'userId',
                    'media_type':mediaType,
                    'media_id':itemId,
                    'csvdata':csvjsonfile_filtered,
                    'media_parent':'medianame'
                }
                axios.post(apiUrl + `/api/v1/marketingDashboard/${apiname}`,csvobject)
                .then((res)=> {return res.data})
                .then((ress)=> {
                        console.log("showing all rss from log",ress)
                        let pmsg={"status":0,"msg":0}
                        pmsg.status=1
                        pmsg.msg="saved"
                        callpopnotify(pmsg)
                        setpopmsgred(null) 
                        logupload(ress.log_id)    
                })
                .catch(()=> callpopnotify({"status":2,"msg":"failed"}))
                setpopmsgreen(null)
            }else{
                let pmsg={"status":0,"msg":0}
                pmsg.status=2
                pmsg.msg=<div>template not matched.download <span style={{"cursor":"pointer","color":"yellow"}} onClick={e=>downloadPDF(e)}>{immarea}</span> template.</div> 
                callpopnotify(pmsg);
               }}else{
                callpopnotify({"msg":"please select correct template","status":2})
              }
    }else{
        let pmsg={"status":0,"msg":0}
            pmsg.status=2
            pmsg.msg="please upload a csv"
            callpopnotify(pmsg)
            setpopmsgreen(null)
       }
}else{
    let pmsg={"status":0,"msg":0}
            pmsg.status=2
            pmsg.msg="select import area"
            callpopnotify(pmsg)
            setpopmsgreen(null)
}}

const performStaticAnalysis = (sourceCode) => {
    const vulnerabilities = [];
  
    // Check for unchecked external calls
    const uncheckedExternalCallsRegex = /(\.call|\.send|\.transfer)\s*\(/g;
    const uncheckedExternalCalls = sourceCode.match(uncheckedExternalCallsRegex);
  
    // Check for reentrancy issues
    const reentrancyRegex = /(\.\w+)\s*\(\s*\)/g;
    const reentrancyIssues = sourceCode.match(reentrancyRegex);
  
    // Categorize vulnerabilities based on severity
    if (uncheckedExternalCalls) {
      vulnerabilities.push({
        category: 'High',
        issue: 'Unchecked External Calls',
        suggestions: ['Ensure external calls are properly checked and validated.'],
      });
    }
  
    if (reentrancyIssues) {
      vulnerabilities.push({
        category: 'Medium',
        issue: 'Reentrancy Issues',
        suggestions: [
          'Implement the "checks-effects-interactions" pattern to prevent reentrancy vulnerabilities.',
        ],
      });
    }
  
    // Other vulnerability checks and categorization can be added here

    return vulnerabilities;
  };
  
  
  const  handleFileUpoad = async (e)=>{
   setisready(false)
   setTimeout(() => {
    setisready(true)
  }, 4000);
    e.preventDefault();
    const uploadedFile= e.target.files[0];  

    if (uploadedFile) {
        const fileName = uploadedFile.name;
        const fileExtension = fileName.split('.').pop();
        setfilextname(fileExtension)
        let dd = checkfileExtension(fileExtension ,fileName)
        console.log("showing daat re",dd)
        // if (dd === true){
            const reader = new FileReader();
            reader.onload = (event) => {
              const sourceCode = event.target.result;
              const vulnerabilities = performStaticAnalysis(sourceCode);
              reports.push(vulnerabilities)
              // Process the vulnerabilities and display them
              console.log('Vulnerabilities:', vulnerabilities);
            };
            reader.readAsText(uploadedFile);
        // }else{
        //     reports.splice(0,reports.length)
        // }
        
      }else{
        callpopnotify({"status":2,"msg":"Please upload a valid file."})

          }    

         
  }


  const getdatatosave=(d)=>{
        if (d === true){
            setisloading(true)
            closeMonthlyReport()
            setTimeout(() => {
                setisloading(false)
                callpopnotify({"status":1,"msg":"Your file is successfully saved."})

            }, 3000);



            // axios.post('/uploaddata' ,reports).
            // then((res)=>{
            //     console.log(res)
            // }).catch((e)=>console.log(e))
        }
  }

const checkfileExtension=(e,name)=>{
    console.log("showing file type",e)
    if(e === 'sol'){
        setfilename(name)
        callpopnotify({"status":1,"msg":"Your file has been received and is currently undergoing processing."})
        return true
        
    }else{
        setfilename('')
        callpopnotify({"status":2,"msg":"Invalid file type. Please upload a 'sol' file for auditing."})
        setreports([])
        return false
    }
}





    return (
        <>
  <RecordLoading isloading={isloading} loadingtype={''} loadingtext={'data is saving....'}/>

         <div id="showMonthlyReport" className="showMonthlyReport" style={{ height: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flex: 1, textAlign: 'left', zIndex: '-99' }}>
                <p style={{ display: 'none', fontSize: '12px', marginLeft: '-40px', width: '540px', justifyContent: 'flex-start' }} id='closeMonthlyReport' className="closeMonthlyReport" onClick={() => closeMonthlyReport()}>
                    <div style={{ float: 'left', marginRight: '5px' }}>× </div>
                    <div>audit result</div>
                </p>
                </div>
                <div style={{ flex: 11, marginTop: '1px', background: '#fff', boxShadow: '0 0 12px 0 rgba(0,0,0,.5)', height: '100%' }}>
              
                {show ?  
                    <Previewreport  data={reports}   gettd={getdatatosave}/>
                     :<div style={{ width: '100%', height: '740px', background: '#fff' }}></div> 
                     } 
{/*                     
                    <div style={{ width: '100%', height: '740px', background: '#fff' }}>
                    <p />
                    </div> */}
       
                </div>
            </div>
            </div>

              
        <div className={style.upload_csv_container} id='upp' >       
            <div className={style.first_cont}  >       
             
                <div className={style.uploadarea}>
                    <div className={style.infoarea}>
                        <div className={style.passage}>
                            <span> <span className={style.textBold}>Important leads is easy!</span> Just follow these 3 simple steps</span>
                            <ol>
                                <li>
                                    create a file with extenstion .sol
                                </li>
                                <li>
                                    Follow required format for the file.
                                </li>
                                <li>Import your saved file by clicking the "browse"  or drag n drop  and click submit</li>
                            </ol>
                        </div>
                    </div>

                    <div className={style.csvuploadarea}>                  
                        <div className={style.dragdroparea}>
                            <div className={style.uploadtextcontainer}>
                            <span className={style.uploadedtext1}> 
                            {filename? <span className={style.popupfilename}>{filename}</span> :'Browse or drag & drop a sol file ghere'}
                            </span>
                            <div className={style.filenamecontaienr}>
                                <span className={style.uploadedtext2}>browse</span>
                              
                            </div>
                            </div>
                            <input type="file" onChange={e=>handleFileUpoad(e)} className={style.fileinputfield} />
                      
                          <div style={{marginBottom:'3rem',width:'100%',height:'4rem' ,backgroundColor:'',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                         
                           {isready ? <>
                                 {reports.length > 0 ? <button className={style.uploadbtn2} onClick={()=>openMonthlyReport()}>preview</button>:null}</> :   <div className={style.spinner}></div>    }            
                       
                            </div>  
                          {/* <button className={style.uploadbtn2} onClick={()=>openMonthlyReport()}>preview</button> */}
                        </div> 
                    </div>
                </div>
            {/* <div className={style.prevbtn} style={{ backgroundColor:'#ff7370'}} onClick={()=>openMonthlyReport()}><span  >preview</span></div> */}

            </div>
            <div className={style.second_cont}>

                                <div className={style.gaparea}></div>
            </div> 
        </div>
        <div className={popmsgred ? style['popmsgopenred']:style['popmsg']}> <div onClick={e=>setpopmsgred(null)}>x</div> <div>{popmsgred}</div></div>
        <div className={popmsggreen ? style['popmsgopengreen']:style['popmsg']}> <div onClick={e=>setpopmsgreen(null)}>x</div> <div>{popmsggreen}</div></div>

        <style jsx>
                    {`

                            

                            .showMonthlyReport  {
                                width: 0;
                                position: fixed;
                                height: 250px;
                                top: 0;
                                right: 0;
                                overflow-x: none;
                                transition:all 300ms;
                                z-index: 99999999999999999999999999999999999999999;
                            }
                            .showMonthlyReport .closeMonthlyReport:hover {
                                color: #ffffff;
                                cursor:pointer;
                                background:#ff7370
                            }
                            .showMonthlyReport .closeMonthlyReport {
                                display: initial;
                                background: #ef5350;
                                padding: 6px 20px;
                                border-radius: 14px 0 1px 14px;
                                position: fixed;
                                top: 13px;
                                color: #fff;
                                margin-left: -135px;
                                box-shadow: 0 0 12px 0 rgba(0,0,0,.5);
                            }       
                         
                            
   


              `}
                </style>
        </>
    );
}

export default UploadCsv;
