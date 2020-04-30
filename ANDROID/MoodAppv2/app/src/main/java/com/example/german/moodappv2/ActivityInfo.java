package com.example.german.moodappv2;

import android.content.Intent;
import android.graphics.Bitmap;

import android.graphics.BitmapFactory;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.github.mikephil.charting.charts.HorizontalBarChart;
import com.github.mikephil.charting.components.XAxis;
import com.github.mikephil.charting.data.BarData;
import com.github.mikephil.charting.data.BarDataSet;
import com.github.mikephil.charting.data.BarEntry;
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ActivityInfo extends AppCompatActivity {

    // atributos relativos al texto en la actividad
    private TextView texto_FOTO;
    private TextView texto_EMOJI;
    private TextView texto_GRAFICA;
    private TextView texto_INSTRUCCIONES;
    private TextView texto_MOOD;
    // atributo con la ImageView de la vista previa de la foto
    private ImageView imagen_FOTO;
    // atributo con la imageView del imagen_EMOJI
    private ImageView imagen_EMOJI;
    // atributo con el boton que dispara la camara
    private FloatingActionButton button_CAMERA;
    // atributo con el boton que muestra la galeria
    private FloatingActionButton button_GALLERY;
    // Grafico
    private HorizontalBarChart chart;
    // atributo que indica la url donde se va a realizar la peticion
    private String url = "http://192.168.1.46:9004/";

    private static final int SELECT_IMAGE_GALLERY= 0;
    private static final int REQUEST_IMAGE_CAPTURE= 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        //
        texto_FOTO = findViewById(R.id.descriptionPhoto);
        texto_EMOJI = findViewById(R.id.descriptionExpression);
        texto_GRAFICA = findViewById(R.id.descriptionChart);
        texto_INSTRUCCIONES = findViewById(R.id.descriptionInstructions);
        texto_MOOD = findViewById(R.id.descriptionMood);

        imagen_FOTO = findViewById(R.id.photoView);
        imagen_EMOJI = findViewById(R.id.emojiView);

        button_CAMERA = findViewById(R.id.floatingCameraButton);
        button_GALLERY = findViewById(R.id.floatingGalleryButton);

        chart = findViewById(R.id.chartView);
        //
        texto_FOTO.setText(R.string.description_foto);
        texto_EMOJI.setText(R.string.description_expression);
        texto_GRAFICA.setText(R.string.description_grafica);
        texto_INSTRUCCIONES.setText(R.string.mensaje_instrucciones);

        button_GALLERY.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                selectFromGallery(v);
            }
        });
        button_CAMERA.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                tomarFoto(v);

            }
        });

    }
    // funcion que cambia el emoticono en funcion de la expresion facial que haya tenido mas probabilidad.
    private void changeEmoji(Expression winner) {
        switch(winner.getMood()){
            case "angry": imagen_EMOJI.setImageResource(R.drawable.emoji_angry);
                break;
            case "disgust": imagen_EMOJI.setImageResource(R.drawable.emoji_disgust);
                break;
            case "fear": imagen_EMOJI.setImageResource(R.drawable.emoji_fear);
                break;
            case "happy": imagen_EMOJI.setImageResource(R.drawable.emoji_happy);
                break;
            case "sad": imagen_EMOJI.setImageResource(R.drawable.emoji_sad);
                break;
            case "surprise": imagen_EMOJI.setImageResource(R.drawable.emoji_surprise);
                break;
            case "neutral": imagen_EMOJI.setImageResource(R.drawable.emoji_neutral);
                break;
        }
        texto_MOOD.setText(winner.getMood());
    }
    // funcion que busca la expresion que tiene una probabilidad mas alta y pinta la grafica en horizontal.
    public void mostrarGrafica(ArrayExpressions arrayExpressions){
        List<BarEntry> expressionsChart = new ArrayList<>();
        int x = 0; // variable x necesaria apra la grafica
        String titulo = "EXPRESIONES";
        String [] moods = new String[arrayExpressions.getExpressions().size()];
        // sin usar expresion lambda
        Expression winner = arrayExpressions.getExpressions().get(0);
        for (Expression expression : arrayExpressions.getExpressions() ){
            if ( expression.getProbability() > winner.getProbability() || expression.getProbability() == winner.getProbability()){
                winner = expression;
            }
            expressionsChart.add(new BarEntry(x,Float.valueOf(String.valueOf(expression.getProbability()) )));
            moods[x]=expression.getMood();
            x++;
        }
        // usando expresion lambda
        //Expression winner = arrayExpressions.getExpressions().stream().max((a,b)->a.getProbability()>b.getProbability()?1:-1).get();
        BarDataSet datos = new BarDataSet(expressionsChart,titulo);
        BarData data = new BarData(datos);
        chart.setData(data);
        XAxis xAxis = chart.getXAxis();
        xAxis.setValueFormatter(new IndexAxisValueFormatter(moods));
        xAxis.setPosition(XAxis.XAxisPosition.TOP);
        chart.setVisibility(View.VISIBLE);
        chart.setFitBars(true);
        texto_INSTRUCCIONES.setVisibility(View.INVISIBLE);
        texto_GRAFICA.setVisibility(View.VISIBLE);
        changeEmoji(winner);
    }
    // Funcion que crea un objeto ServicioTask que extiende de AsyncTask para poder ejecutar peticiones HTTP en otro Thread distinto al principal, si hay exito se pinta la grafica.
    public void consumirServicio(File photo){
        ArrayExpressions responseExpressions = null;
        try {
            ServicioTask servicioTask = new ServicioTask(photo);
            responseExpressions = servicioTask.execute(url).get();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        if(responseExpressions!=null) {
            mostrarGrafica(responseExpressions);
        }
        else{
            // NO SE HA PODIDO OBTENER LAS EXPRESIONES DEL SERVIDOR
            Toast.makeText(getApplicationContext(), "No se ha podido obtener respuesta del servidor.", Toast.LENGTH_SHORT).show();
        }
    }
    //Funcion que toma la foto en formato bitmap y coloca una vista previa de la foto, posteriormente se inserta la foto en un archivo File temporal y se llama a la funcion encargada de realizar al peticion POST
    void setViewAndCall(Bitmap bitmap){
        // pasamos la foto a bitmap para mostrarla como vista previa en la aplicacion
        imagen_FOTO.setImageBitmap(bitmap);
        // comprimimos la imagen para enviarla al servidor
        try {
            File tempFile = File.createTempFile("photo","tmp");
            BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(tempFile));
            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, os);
            consumirServicio(tempFile);
            os.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    // funcion sobreescrita que es llamada siempre, tanto si se ha tomado una foto como si se ha seleccionado una foto de la galeria, extrae la foto dependiendo de la eleccion y la transforma en bitmap.
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            Bundle extras = data.getExtras();
            Bitmap bitmap = (Bitmap) extras.get("data");
            setViewAndCall(bitmap);
        }
        if (requestCode == SELECT_IMAGE_GALLERY && resultCode == RESULT_OK){
            try {
                InputStream input = getContentResolver().openInputStream(data.getData());
                Bitmap bitmap = BitmapFactory.decodeStream(input);
                setViewAndCall(bitmap);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
    // funcion que se ejecuta al tocar el icono de la galeria, solicita acceso a la galeria para dar la opción al usuario de seleccionar una imagen a su eleccion
    public void selectFromGallery(View view){
        Intent intent = new Intent (Intent.ACTION_GET_CONTENT);
        intent.setType("image/*");
        startActivityForResult(intent.createChooser(intent,"Seleccione imagen"),SELECT_IMAGE_GALLERY);
    }
    // funcion que se ejecuta al tocar el icono de la camara, solicita a la camara del dispositivo que se ejecute lista para tomar una foto.
    public void tomarFoto(View view) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }
}