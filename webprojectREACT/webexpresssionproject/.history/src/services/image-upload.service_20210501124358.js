
class ImageUploadService {

    urlApi = "http://ec2-44-192-30-220.compute-1.amazonaws.com:9004/getMood";

    getMood(file) {

        const formData = new FormData()
        formData.append(keyFile,file);
        return fetch(
          this.urlApi, {
            method : 'POST',
            body : formData
            })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.error(error));

    }
}

export default new ImageUploadService();
