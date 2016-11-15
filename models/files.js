var multer = require( 'multer' );
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var sizeOf = require( 'image-size' );
var upload = multer({ storage: storage }).single('file');

var File = {
      fileUpload: function(req, res) {
          upload(req, res, function(err) {
              if(err) {
                  console.log(err);
                  return res.status(422).json({error : 'Error Occured'});
              };
              res.end('Your File Uploaded');
          });

          // if ( !req.file.mimetype.startsWith( 'image/' ) ) {
          //     return res.status( 422 ).json( {
          //         error : 'The uploaded file must be an image'
          //     } );
          // }
          //
          // var dimensions = sizeOf( req.file.path );
          //
          // if ( ( dimensions.width < 640 ) || ( dimensions.height < 480 ) ) {
          //     return res.status( 422 ).json( {
          //         error : 'The image must be at least 640 x 480px'
          //     } );
          // }
          // console.log(req.file)
          // return res.status( 200 ).send( req.file );
      }
};

module.exports = File;