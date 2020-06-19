package com.example.german.moodapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;


public class ActivityInit extends AppCompatActivity {

    private TextView texto_BIENVENIDA;

    private TextView texto_EXPLICACION;

    private TextView texto_INSTRUCCION;

    private Button button_CHANGE;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_init);
        // incorporamos los elementos a la app
        button_CHANGE = findViewById(R.id.buttonStart);
        texto_BIENVENIDA = findViewById(R.id.textSalut);
        texto_EXPLICACION = findViewById(R.id.textExplain);
        texto_INSTRUCCION = findViewById(R.id.textInstruction);

        //Colocamos el texto en los objetos TextView
        texto_BIENVENIDA.setText(R.string.mensaje_bienvenida);
        texto_EXPLICACION.setText(R.string.mensaje_explicacion);
        texto_INSTRUCCION.setText(R.string.mensaje_instruccion);
        button_CHANGE.setText(R.string.mensaje_empezar);

        button_CHANGE.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent info = new Intent(ActivityInit.this,ActivityInfo.class);
                startActivity(info);
            }
        });
    }
    /*@Override
    protected void onResume() {
        super.onResume();
        Toast.makeText(this, "OnResume", Toast.LENGTH_SHORT).show();
        // La actividad se ha vuelto visible (ahora se "reanuda").
    }
    @Override
    protected void onPause() {
        super.onPause();
        Toast.makeText(this, "OnPause", Toast.LENGTH_SHORT).show();
        // Enfocarse en otra actividad  (esta actividad está a punto de ser "detenida").
    }
    @Override
    protected void onStop() {
        super.onStop();
        Toast.makeText(this, "OnStop", Toast.LENGTH_SHORT).show();
        // La actividad ya no es visible (ahora está "detenida")
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        Toast.makeText(this, "OnDestroy", Toast.LENGTH_SHORT).show();
        // La actividad está a punto de ser destruida.
    }*/
}
