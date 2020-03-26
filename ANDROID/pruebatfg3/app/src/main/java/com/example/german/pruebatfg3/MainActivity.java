package com.example.german.pruebatfg3;

import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.ExecutionException;

public class MainActivity extends AppCompatActivity {

    // atributo con la ImageView
    private ImageView img;
    // atributo con el nombre que recibe la foto
    private String imageFileName = " ";
    // atributo donde se almacena la foto
    private File photoFile;
    // atributo que indica la url donde se va a realizar la peticion
    private String url = "http://192.168.1.46:9004/getMood";

    private static final int REQUEST_IMAGE_CAPTURE= 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        img = findViewById(R.id.imageView);
        if (ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED &&
                ActivityCompat.checkSelfPermission(MainActivity.this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.CAMERA}, 1000);
        }
    }
    // Funcion que crea un objeto ServicioTask que extiende de AsyncTask para poder ejecutar peticiones HTTP en otro Thread distinto al principal
    public void consumirServicio(File photo){
        String response = " ";
        try {
            ServicioTask servicioTask = new ServicioTask(getApplicationContext(),url,photo);
            response = servicioTask.execute().get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Toast.makeText(MainActivity.this,response, Toast.LENGTH_SHORT).show();
    }
    //Funcion que es llamada por startActivityResult. Transforma la imagen en un bitmap para poder tener una vista previa de la foto, posteriormente se inserta la foto en un archivo File y se llama al servicio REST
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            // pasamos la foto a bitmap para mostrarla como vista previa en la aplicacion
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            img.setImageBitmap(imageBitmap);

            // comprimimos la imagen para enviarla al servidor
            try {
                BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(photoFile));
                imageBitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
                consumirServicio(photoFile);
                os.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    // Devuelve una foto en forma de archivo File
    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
        // Save a file: path for use with ACTION_VIEW intents
        return image;
    }

    // Primera funcion que se ejecuta al tocar el icono de la camara, solicita a la camara del dispositivo que tome una foto
    public void tomarFoto(View view) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            try {
                photoFile = createImageFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }
}
