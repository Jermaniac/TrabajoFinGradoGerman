import axios from 'axios'

const keyFile = "photo";
const urlApi =  "http://ec2-3-236-13-113.compute-1.amazonaws.com:9004/getMood";

class ImageUploadService {

  getMood(file) {

    const formData = new FormData();
    formData.append(keyFile, file);

    axios.post(urlApi,formData)
      .then (response => {
        return response
      })
  }

}

export default new ImageUploadService();
