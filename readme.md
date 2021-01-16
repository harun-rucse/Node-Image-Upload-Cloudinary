# NodeJs Image Upload in cloudinary cloud

#### Using express multer sharp streamifier and dotenv

## Installation

Clone repository

```
git clone https://github.com/harun-rucse/Node-Image-Upload-Cloudinary.git
```

Install dependencies

```
npm install
```

Add config.env file in the root directory

```
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET_KEY=your-cloudinary-api-secret-key
```

Run server

```
npm run start
```

Testing API using Postman

```
POST localhost:5000/upload-single-image
Body -> form-data then, key: photo value: select image
```

```
POST localhost:5000/upload-multiple-image
Body -> form-data then, key: photo value: select image
                        key: photo value: select another image
```
