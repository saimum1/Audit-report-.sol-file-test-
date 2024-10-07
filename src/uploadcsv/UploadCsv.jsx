import React,{useState,useEffect} from 'react'
import style from '../uploadcsv/styleBs/containerx.module.css';
import axios  from 'axios';
import RecordLoading from './RecordLoading';
import CommonDialogueBox from './CommonDialogueBox';


const UploadCsv = ({productName,folderName,getdata}) => {
   
    const[cusloading,setcusloading]=useState(false)
    const[isopen,setisopen]=useState(false)
    const[cusloadingtext,setcusloadingtext]=useState()
    const[cusloadingtype,setcusloadingtype]=useState()
    const[customerrormsg,setcustomerrormsg]=useState()
    const[notitype,setnotitype]=useState()
    const[actType,setactType]=useState()
    const[returnrestype,setreturnrestype]=useState()
    const[serviceRequestType,setserviceRequestType]=useState()
    const[notificationType,setnotificationType]=useState()
    const[actionType,setactionType]=useState()
    const[messarray,setmessarray]=useState([])
    const[resCode,setresCode]=useState()
    const[fileUrl,setfileUrl]=useState('')
    const[uploadFIleName,setuploadFIleName]=useState('')
    const[uploadFIle,setuploadFIle]=useState('')
    const[uploadSize,setuploadSize]=useState('')
    const[uploadType,setuploadType]=useState('')
    const[uploadfiletype,setuploadfiletype]=useState('')
    const[uploadres,setuploadres]=useState(false)
    const[resposeDatax,setresposeDatax]=useState()
    const[cdnlinkx,setcdnlinkx]=useState('')
    const[cdnStatus,setcdnStatus]=useState(null)

    const[supportedFileTypes,setsupportedFileTypes]=useState(['mp4', 'jpg', 'jpeg', 'png', 'skp', 'dwg', 'ppt', 'pptx', 'pdf', 'avi'])



    useEffect(() => {
        getCDNinfo()
    }, [productName,folderName,getdata])
    
    const getCDNinfo = async() => {
          setcdnlinkx('https://filecdnapi.onrender.com/saveRequirementsFiles') 
          //   setcdnlinkx('https://filecdnapi.vercel.app/saveRequirementsFiles')
        };
  
    
    const handleFileUpoad = async (e) => {

        const file = e.target.files[0];
        setuploadfiletype('')
        setfileUrl('');
        setuploadFIleName('');
    
        if (!file) {
            setuploadFIle('')
            setcustomerrormsg('');
            return;
        }else{
            setuploadFIle(file)

        }
    
        const filesize = file.size / (1024 * 1024);
        const filetype = file.name.slice((file.name.lastIndexOf('.') - 1 >>> 0) + 2);
        setuploadSize(filesize.toFixed(2))
        setuploadType(filetype)
       if (!supportedFileTypes.includes(filetype)) {
            setcustomerrormsg('Unsupported file type. Supported types: mp4, jpg, jpeg, png, skp, dwg, ppt, pptx, pdf, avi.');
        } else {
            if (['mp4', 'avi'].includes(filetype)) {
                setuploadfiletype('video')
            } else if (['jpg', 'jpeg', 'png'].includes(filetype)) {
                setuploadfiletype('image')
            } else if (['ppt', 'pptx', 'pdf'].includes(filetype)) {
                setuploadfiletype('file')
            } else if (['skp', 'dwg'].includes(filetype)) {
                setuploadfiletype('drawing')
            } 

            if (filetype !== 'skp') {
                if (filesize > 100000000000) {
                    setcustomerrormsg('File size is over 100 MB.Video file size is limited to 100mb.');
                } else {
                setfileUrl(URL.createObjectURL(file));
                setuploadFIleName(file.name);
                return}
            }else{
                setfileUrl(URL.createObjectURL(file));
                setuploadFIleName(file.name);
                return
            }
        }
    
        setcusloading(false);
        setresCode('failed');
        setactionType('alert');
        setnotificationType('alert');
        setisopen(true);
        setfileUrl('');
        setuploadFIleName('');
        removeItem()
    };

      const getclosemsg=async ({returnactionType})=>{
		
				if(returnactionType === 'close'){
					setisopen(false)
                    if(notificationType === 'post' && uploadres === true){
                        getdata({'res':resposeDatax,'file':uploadFIle})
                    }
				}else if (returnactionType === "submit"){
					console.log("parse msg"," savae data")
					setisopen(false)
					setcusloading(true)
					setcusloadingtext('file is uploading...')
                    uploadfile()
				}
	}


    const opendialoguebox=()=>{
         if(productName === '' || folderName === ''){
                setcustomerrormsg('techical error-please contact with IT department')
                setactionType('alert');
                setnotificationType('alert');
                setisopen(true);
    
        
         }else{
            let d={'File name':uploadFIleName,'File size':`${uploadSize} mb`,'File type':uploadType}
             setactionType('save');
             setnotificationType('pre');
             setisopen(true);
             setserviceRequestType('File upload')
             setmessarray(d)
          } 
       }



    

    const uploadfile =async()=>{                          

                let data = new FormData();
                data.append('folder_name', folderName); 
                data.append("file", uploadFIle);
                data.append('file_type', uploadfiletype);  
                data.append('product_name', productName); 
                data.append('cdnlink',cdnlinkx)
                data.append('cdnstatus',cdnStatus)




              

                      
                axios.post(cdnlinkx, data) 
                axios.post(cdnlinkx, data)  
                      .then((response) => {

                            console.log("file upload response---->",response)
                            setmessarray({'file title':uploadFIleName})
                            setcusloading(false);
                            setresCode(response?.data?.status)
                            setnotificationType('post')
                            setisopen(true)
                        if (response.data.status === "success") {
                            setuploadres(true)
                            setresposeDatax(response.data)

                            console.log("resxxc",response.data)
                            const responseData = { message: 'Data processed in Page B' };
                            window.parent.postMessage(responseData, 'http://localhost:3456/setting/clientRequest/campaign/marketingDashboard/marketingDashboardNew'); 
                           
                        }
                    })
                    .catch((err) => {
                        setmessarray({'Technical error':'please contact with IT'})
                        setcusloading(false);
                        setresCode('failed')
                        setnotificationType('post')
                        setisopen(true)
                    });
        
    }

    const removeItem =()=>{
        setcusloading(false);
        setuploadFIle('')
        setfileUrl('');
        setuploadFIleName('');
        setuploadfiletype('')

    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const productName = queryParams.get('productName'); 
        const folderName = queryParams.get('folderName'); 
        console.log("sadasdasd",productName,folderName)
        setcdnStatus('success')

      }, []); 

  
  return (
    <>
     <RecordLoading isloading={cusloading} loadingtype={cusloadingtype}  loadingtext={cusloadingtext}/>
 
            {isopen === true?
            <CommonDialogueBox  returnMessage={getclosemsg}
            serviceRequestType={serviceRequestType} 
            open={isopen} 
            notificationType={notificationType} 
            actionType={actionType}
            errormsg={customerrormsg} 
            messageArray={messarray}
            statuscode={resCode}
            />:''}


    <div className={style.upload_csv_container} id='upp'style={{overflow:'none',height:'100vh'}} >   

        <div className={style.first_cont}  >  
           
            <div className={style.uploadarea} >
                <div className={style.csvuploadarea} style={{transition:'all 300ms'}}>  


               {cdnlinkx === '' ?
               
         <div className={style.dragdroparea} >
               <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}>
                <div style={{
                  border: '6px solid #f3f3f3', // Light grey
                  borderTop: '6px solid #e63946', // Reddish
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 2s linear infinite',
                }} />
                <div style={{
                  marginLeft: '10px',
                  fontSize: '18px',
                  color: '#555',
                }}>
                  Getting uploader ready to use...
                </div>
                <style>
                  {`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}
                </style>
              </div>
              </div>
                :
<>
                 {uploadFIle ==''?             
                    <div className={style.dragdroparea} style={{border:' 2px dashed grey'}}>
                       
                 
                        <div className={style.uploadtextcontainer}>
                            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                        <span className={style.uploadedtext1}>drop a file here</span>
                        <span className={style.uploadedtext1} style={{fontSize:'13px',color:"GrayText"}}> Files Supported: mp4, jpg, jpeg, png, skp, dwg, ppt, pptx,pdf, avi </span>
                        </div>
                        <div className={style.filenamecontaienr} style={{display:'flex' ,flexDirection:'column' ,justifyContent:'center' ,alignItems:'center' ,gap:'4px'}}>
                            <span className={style.uploadedtext2} style={{boxShadow:'1px 1px 10px  black'}}
                            
                            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '10px 1px 95px red')}
                            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '1px 1px 10px black')}>browse</span>
                                
                    {uploadFIle && (
                    <span
                        className='texteffet'
                    >
                        {uploadFIleName && <span className={style.popupfilename}>{uploadFIleName}</span>}
                    </span>
                    )}
                        </div>
                        </div>
                        <input type="file" onChange={e=>handleFileUpoad(e)} className={style.fileinputfield}  id="filestoupload"/>
                  
                    </div>
                    
                    :

                    uploadFIle && uploadfiletype === 'video' || uploadfiletype === 'image'?
                    <div className={style.dragdroparea} style={{border:' 2px dashed grey',position:'relative'}} >
                           <div style={{position:'absolute',right:'-20px',top:'-20px'}}><span style={{textShadow: '1px 1px 10px black',fontSize:'15px',color:'#EF5350',transition:'all 300ms'}}
                            onMouseEnter={(e)=>(e.currentTarget.style.fontSize='19px')}
                            onMouseLeave={(e)=>(e.currentTarget.style.fontSize='15px')} onClick={()=>removeItem()}>X</span></div>
                       <div style={{display:'flex',justifyContent:'center',alignItems:'center',width: '98%',borderRadius:'3px',transition:'all 300ms',height:'95%'}}>
                     
                       { uploadFIle && uploadfiletype === 'video' ?
                            <video controls autoPlay style={{ width: '100%',boxShadow:'1px 1px 18px #7d87ce',borderRadius:'3px',transition:'all 300ms',height:'100%' }}>
                                <source src={fileUrl && fileUrl} type="video/mp4" />
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.5)', animation: 'dimming 1s forwards' }}></div>
                                Your browser does not support the video tag.
                            </video>
                            :
                            uploadFIle && uploadfiletype === 'image' ?
                               <img  src={fileUrl && fileUrl} style={{ width: '100%',boxShadow:'1px 1px 18px #7d87ce',borderRadius:'3px',transition:'all 300ms',height:'100%' }}/>
                                         :<span>{uploadFIleName && uploadFIleName}</span>
                        }
                        </div>
                     </div>
                     :
                     
                     <div className={style.dragdroparea} style={{border:' 2px dashed grey',position:'relative'}} >
                            <div style={{position:'absolute',right:'-20px',top:'-20px'}}><span style={{textShadow: '1px 1px 10px black',fontSize:'15px',color:'#EF5350',transition:'all 300ms'}}
                            onMouseEnter={(e)=>(e.currentTarget.style.fontSize='19px')}
                            onMouseLeave={(e)=>(e.currentTarget.style.fontSize='15px')} onClick={()=>removeItem()}>X</span></div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width: '98%',borderRadius:'3px',transition:'all 300ms',height:'95%'}}>
                    
                                    <span>{uploadFIleName && uploadFIleName}</span>
                        </div>
                    </div>
                    
                    }   </>
                }
                </div>
            </div>
        </div>
        <div className={style.second_cont}>
              <div style={{marginBottom:'0rem',width:'100%',height:'4rem' ,backgroundColor:'',display:'flex',justifyContent:'center' ,alignItems:'center'}}>
                {uploadFIle && (
                    uploadres === false? <button onClick={()=>opendialoguebox()} className={style.uploadbtn2} >upload</button>: uploadres === true? <span style={{color:'green',fontSize:"1.5rem"}}>file was uploaded succcessfully</span>:"") }
                        </div>

                            <div className={style.gaparea}></div>
        </div> 
    </div>
    <style jsx>{`

        .texteffet{
            display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      margin: 2rem 0rem;
      animation: glow 1s infinite alternate;
      border: 1px solid #e5e0e0;
      border-radius:4px;
        }

        @keyframes glow {
            0% {
              box-shadow: 0 0 7px #3498db; /* Glowing effect color */
            }
            100% {
              box-shadow: 0 0 20px #3498db; /* Increase the glow size and intensity */
            }
          }


        
          
          
    `}</style>
    </>
  )
}


export default UploadCsv;
