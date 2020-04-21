package com.example.german.moodapp;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Build;
import android.support.annotation.RequiresApi;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;


public class ServicioTask extends AsyncTask<Void,Void,String> {
    private Context httpContext;
    public String linkRequestAPI = " ";

    private HttpURLConnection httpConn;
    private DataOutputStream request;
    private final String boundary =  "*****";
    private final String crlf = "\r\n";
    private final String twoHyphens = "--";

    private File photo = null;

    // constructor de la clase ServicioTask
    public ServicioTask(Context httpContext, String linkRequestAPI, File photo) {
        this.httpContext = httpContext;
        this.linkRequestAPI = linkRequestAPI;
        this.photo = photo;

    }

   // Funcion que agrega la foto en forma de File a la peticion POST.
    @RequiresApi(api = Build.VERSION_CODES.O)
    public void addFilePart(String fieldName, File uploadFile)
            throws IOException {
        String fileName = uploadFile.getName();
        request.writeBytes(this.twoHyphens + this.boundary + this.crlf);
        request.writeBytes("Content-Disposition: form-data; name=\"" +
                fieldName + "\";filename=\"" +
                fileName + "\"" + this.crlf);
        request.writeBytes(this.crlf);

        byte[] bytes = Files.readAllBytes(uploadFile.toPath());
        request.write(bytes);
    }
    // Funcion que obtiene el response de la peticion POST en la que se incluye el resultado
    public String finish() throws IOException {
        String response ="";

        request.writeBytes(this.crlf);
        request.writeBytes(this.twoHyphens + this.boundary +
                this.twoHyphens + this.crlf);

        request.flush();
        request.close();

        // si la conexion es correcta (200) se obtiene el response.
        int status = httpConn.getResponseCode();
        if (status == HttpURLConnection.HTTP_OK) {
            InputStream responseStream = new
                    BufferedInputStream(httpConn.getInputStream());

            BufferedReader responseStreamReader =
                    new BufferedReader(new InputStreamReader(responseStream));

            String line = "";
            line = responseStreamReader.readLine();
            if (line!=null){
                response = line;
            }
            responseStreamReader.close();

            httpConn.disconnect();
        } else {
            throw new IOException("Server returned non-OK status: " + status);
        }

        return response;
    }
    // Inicializa una nueva peticion HTTP POST con Content-Type con valores multipart/form-data
    private void setConnection() throws IOException  {
        URL url = new URL(linkRequestAPI);
        httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setUseCaches(false);
        httpConn.setDoOutput(true); // indicates POST method
        httpConn.setDoInput(true);

        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("Connection", "Keep-Alive");
        httpConn.setRequestProperty("Cache-Control", "no-cache");
        httpConn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + this.boundary);

        request =  new DataOutputStream(httpConn.getOutputStream());
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected String doInBackground(Void... params) {
        try {
            setConnection();
            addFilePart("photo", photo);
            return finish();
        } catch (IOException e) {
            e.printStackTrace();
        }
    return "La conexion ha fallado.";
    }

}