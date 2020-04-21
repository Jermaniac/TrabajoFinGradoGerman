package com.example.german.moodapp;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import org.json.JSONException;
import org.w3c.dom.Text;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ActivityInit extends AppCompatActivity {

    private TextView bienvenida;

    private TextView explicacion;

    private TextView instruccion;

    private Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_init);
        // incorporamos los elementos a la app
        button = findViewById(R.id.buttonStart);
        bienvenida = findViewById(R.id.textSalut);
        explicacion = findViewById(R.id.textExplain);
        instruccion = findViewById(R.id.textInstruction);

        //Colocamos el texto en los objetos TextView
        bienvenida.setText(R.string.mensaje_bienvenida);
        explicacion.setText(R.string.mensaje_explicacion);
        instruccion.setText(R.string.mensaje_instruccion);
        button.setText(R.string.mensaje_empezar);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent info = new Intent(ActivityInit.this,ActivityInfo.class);
                startActivity(info);
            }
        });
    }

}
