package com.example.german.moodappv2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

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
