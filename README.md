# ProyectoFinGrado
Este es el repositorio que contiene el código correspondiente al proyecto de fin de grado de Germán González Garzón.

Se trata de una aplicación en Android que reconoce siete expresiones faciales (enfadado, disgustado, asustado, feliz, triste, sorprendido, neutral) a partir de una fotografía utilizando una red neuronal convolucional o CNN.
Basicamente se trata de una estructura cliente-servidor en donde el cliente o dispositivo móvil envía una fotografía al servidor o en este caso la CNN. El servidor realiza la predicción y envía como respuesta al cliente los resultados. El cliente interpreta los resultados y los muestra al usuario de forma sencilla e intuitiva.

INSTRUCCIONES:
Es necesario ejecutar TFG_RF_CNN_REST.ipynb para que la aplicación funcione.
En la carpeta MoodApp se encuentra la aplicación Android desarrollada.
Los archivos expresionsjsonMODELtest4.json y expresionsh5MODELtest4.h5 contienen el modelo entrenado.
Es necesario modificar las IP's para que se puedan realizar las peticiones.

NOTA IMPORTANTE: será necesario tener el dataset fer2013.csv si se quieren entrenar nuevos modelos. Este dataset se puede encontrar en: https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge
