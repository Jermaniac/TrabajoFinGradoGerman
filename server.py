from bottle import Bottle,route, run, request, static_file

import os

app = Bottle()

# lista para almacenar los nombres de las fotos
nombre_fotos = []

# realiza el GET de la foto tomada del POST del directorio donde se guardan
@app.route('/upload', method='GET')
def get_Photo():
    img = static_file(nombre_fotos[len(nombre_fotos)-1], root='G:\datos\TFG\photos')
    return img
# realiza el POST y almaceno la foto que me viene del movil en el directorio G:/datos/TFG/photos
@app.route('/upload', method='POST')
def do_upload():
    upload = request.files.get('photo')
    save_path = "/datos/TFG/photos/"
    if not os.path.exists(save_path):
        os.makedirs(save_path)
    file_path = "{path}/{file}".format(path=save_path, file=upload.filename)
    nombre = "{file}".format(file = upload.filename)
    nombre_fotos.append(nombre)
    upload.save(file_path)
    return "Foto guardada en '{0}'.".format(save_path)

# con esta ruta obtengo los nombres de las fotos que han sido tomadas desde Android
@app.route('/fotosAndroidAll', method='GET')
def get_AndroidPhotos():
    return {'fotos': nombre_fotos}

# con esta ruta obtengo todos los archivos dentro de la carpeta /datos/TFG/photos/
# que es donde estan todas las fotos
@app.route('/fotosAll', method='GET')
def get_allPhotos():
    lista_arq = ls('/datos/TFG/photos/')
    return {'fotos': lista_arq}

run(app,host='192.168.1.46', port=9004, debug=True)