package com.example.german.moodapp;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import com.github.mikephil.charting.charts.BarChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ActivityInfo extends AppCompatActivity {

    // atributo con la ImageView de la vista previa de la foto
    private ImageView imagen;
    // atributo con la imageView del emoji
    private ImageView emoji;
    // atributo con el nombre que recibe la foto
    private String imageFileName = " ";
    //
    private ImageButton camara;
    // atributo donde se almacena la foto
    private File photoFile;
    // atributo que indica la url donde se va a realizar la peticion
    private String url = "http://192.168.1.46:9004/getMood";
    // Grafico
    BarChart chart;


    private static final int REQUEST_IMAGE_CAPTURE= 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        // incorporamos las variables
        emoji = findViewById(R.id.imageEmoji);
        chart = findViewById(R.id.chart);
        camara = findViewById(R.id.camaraButton);
        imagen = findViewById(R.id.imageView);
        camara.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tomarFoto(v);
            }
        });
    }
    // Funcion que muestra la grafica cada vez que una foto es tomada con los porcentajes de cada expresion facial
    public void mostrarGrafica(String response) throws JSONException {
        List<Expression> expressions = new ArrayList<>();
        List<String> moodlabels = new ArrayList<>();
        List<BarEntry> expressionsChart = new ArrayList<>();
        JSONObject json = new JSONObject(response);
        String max = "";
        Double maxProbability = 0.000;
        JSONArray json_array = json.optJSONArray("expressions"); //cogemos cada uno de los elementos dentro de la etiqueta "expressions"S
        for (int i = 0; i < json_array.length(); i++) {
            expressions.add(new Expression(json_array.getJSONObject(i)));
            moodlabels.add(json_array.getJSONObject(i).getString("mood"));
            if (expressions.get(i).getProbability()>maxProbability){
                maxProbability=expressions.get(i).getProbability();
                max = expressions.get(i).getMood();
            }
            expressionsChart.add(new BarEntry(i, expressions.get(i).getProbability().floatValue()));
        }
        System.out.print("XD1:"+expressionsChart);
        BarDataSet datos = new BarDataSet(expressionsChart,"EXPRESSIONS");

        System.out.println("cPUEDE ZEs:"+ Float.toString(datos.getXMax()));
        BarData data = new BarData(datos);
        chart.setData(data);
        XAxis xAxis = chart.getXAxis();
        xAxis.setValueFormatter(new IndexAxisValueFormatter(moodlabels));

        xAxis.setPosition(XAxis.XAxisPosition.TOP);
        System.out.println("JOER:    "+chart.getYMax());
        switch(max){
            case "angry":
                emoji.setImageResource(R.drawable.emoji_angry);
                break;
            case "disgust": emoji.setImageResource(R.drawable.emoji_disgust);
                break;
            case "fear": emoji.setImageResource(R.drawable.emoji_fear);
                break;
            case "happy": emoji.setImageResource(R.drawable.emoji_happy);
                break;
            case "sad": emoji.setImageResource(R.drawable.emoji_sad);
                break;
            case "surprise": emoji.setImageResource(R.drawable.emoji_surprise);
                break;
            case "neutral": emoji.setImageResource(R.drawable.emoji_neutral);
                break;
        }
        chart.setFitBars(true);
        emoji.setVisibility(View.VISIBLE);
        chart.setVisibility(View.VISIBLE);
    }

    // Funcion que crea un objeto ServicioTask que extiende de AsyncTask para poder ejecutar peticiones HTTP en otro Thread distinto al principal
    public void consumirServicio(File photo) throws JSONException {
        String response = " ";
        try {
            ServicioTask servicioTask = new ServicioTask(getApplicationContext(),url,photo);
            response = servicioTask.execute().get();
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        mostrarGrafica(response);
    }

    //Funcion que es llamada por startActivityResult. Transforma la imagen en un bitmap para poder tener una vista previa de la foto, posteriormente se inserta la foto en un archivo File y se llama al servicio REST
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            // pasamos la foto a bitmap para mostrarla como vista previa en la aplicacion
            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");
            imagen.setVisibility(View.VISIBLE);
            imagen.setImageBitmap(imageBitmap);
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
            } catch (JSONException e) {
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

    // Primera funcion que se ejecuta al tocar el icono de la camara, solicita a la camara del dispositivo que se ejecute lista para tomar una foto.
    public void tomarFoto(final View view) {
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
