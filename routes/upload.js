// router.post('/upload', auth, admin, (req, res) => {
//     const uploadedFile = req.files.file;
//     const {description, userId} = req.body;
//     let tmpPath = uploadedFile.path;
//     let newPath =   'media/'+uploadedFile.name;
//     fs.rename(tmpPath, newPath, function (err) {
//         if (err) throw err;
//         fs.unlink(tmpPath, function () {
//             if (err) throw err;
//             const newUFile = new UFile(
//                 {
//                     name: uploadedFile.name,
//                     user: userId,
//                     description: description,
//                     type: uploadedFile.type
//                 }
//             );
//             newUFile.save((err,doc)=>{
//                 if (err) {
//                     if (err.code===11000){
//                         return res.json({success: false, exist:true})
//                     }
//                     return res.json({success: false, err})
//                 }
//                 res.status(200).json({success: true})
//             })
//         });
//     });
// });
