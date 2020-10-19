import React,{useState} from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import axios from 'axios'


function FileUpload(){

    const [Images, setImages] = useState([])


    const dropHandler = (files)=>{

          //file을 백엔드에 전해줌(1)

        let formData = new FormData();

        const config ={
            header:{'content-type':'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            // 백엔드가 file저장하고 그 결과가 reponse에 담김
            // 백엔드는 그 결과를 프론트로 보내줌(3)
            .then(response =>{
                if(response.data.success){
                  console.log(response.data)
                  setImages([...Images, response.data.filePath])
                }else{
                    alert('파일 저장 실패')
                }
            })

    }

    return(
        <div style={{display: 'flex', justifyContent:'space-between'}}>
           <Dropzone onDrop={dropHandler}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div 
      style={{width: 300, height:240, border: '1px solid lightgray',
    display: 'flex', alignItems: 'center', justifyContent: 'center'}}
      {...getRootProps()}>
        <input {...getInputProps()} />
        <Icon type="plus" style={{ fontSize:'3rem'}}/>
      </div>
    </section>
  )}
</Dropzone>

    {/* Dropzone옆에 올린 파일 보여지는 곳 */}
       <div style={{ display: 'flex', width: '350px', height: '240px', overflowX:'scroll'}}>

          {Images.map((image, index) => (
              <div>
                  <img style={{ minWidth: '300px', width:'300px', height: ' 240px'}}
                  src={`http://localhost:5000/${image}`}
                  />
                </div>
          ))} 
        
       </div>

</div>
    )
}

export default FileUpload