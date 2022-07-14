import sharp from 'sharp';

export const redimg= (filePath, fileName, size=300)=>{
    return sharp(filePath)
        .resize(size)
        .toFile(`../login_img/${fileName}`)
}