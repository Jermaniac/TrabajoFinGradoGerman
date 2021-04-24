
class ImageUploadService {

    urlApi = "http://ec2-3-236-211-219.compute-1.amazonaws.com:9004/getMood";

    getMood(file) {

        let expressions;
        const formData = new FormData()
        formData.append("photo",file);
    
        return fetch(
          this.urlApi,
            {
            method : 'POST',
            body : formData
            })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.error(error))
        .finally(() => {
          console.log("Success!")
        });

    }
}

export default new ImageUploadService();
