
const keyFile = "photo";
const urlApi =  "http://ec2-44-192-76-93.compute-1.amazonaws.com:9004/getMood";

class ImageUploadService {

  getMood(file) {

    const formData = new FormData();
    formData.append(keyFile, file);

    return fetch(urlApi, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => console.error(error));
  }

}

export default new ImageUploadService();
