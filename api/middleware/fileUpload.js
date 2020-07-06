import path from 'path';

const fileUpload = (req, res, next) => {
  const image = req.files.productImage;
  // console.log(image)
  const imageUrl = path.join(
    __dirname,
    '..',
    '..',
    `/uploads/${new Date().toISOString() + image.name}`
  );
  image.mv(imageUrl, (err) => {
    if (err) {
      console.log(err);
    }
  });
  req.productImage = imageUrl;
  next();
};
export default fileUpload;
