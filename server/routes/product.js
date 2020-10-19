const express = require('express');
const router = express.Router();
const multer = require('multer')

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage }).single("file")


router.post('/image',(req,res) => {
    //프론트에서 가져온 이미지를 저장해줌 (2)
    upload(req, res, err =>{
        if(err){
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path , fileName: res.req.file.filename})
    })

})

module.exports = router;