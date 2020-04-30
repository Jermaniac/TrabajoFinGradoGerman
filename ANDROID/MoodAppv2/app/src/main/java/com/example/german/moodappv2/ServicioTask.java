package com.example.german.moodappv2;

import android.os.AsyncTask;

import java.io.File;
import java.io.IOException;


import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class ServicioTask extends AsyncTask<String,Void,ArrayExpressions> {

    private File photo;

    public ServicioTask(File photo) {
        this.photo = photo;

    }

    @Override
    protected ArrayExpressions doInBackground(String... strings) {
        ArrayExpressions expressions = null;
        String mime = "image/jpeg";
        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(strings[0])
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        ClientApi cliente = retrofit.create(ClientApi.class);
        System.out.println();
        RequestBody photoPart = RequestBody.create(MediaType.parse(mime),photo);
        MultipartBody.Part picture = MultipartBody.Part.createFormData("photo",photo.getName(),photoPart);
        Call<ArrayExpressions> call = cliente.sendRequest(picture);
        try {
            expressions = new ArrayExpressions(call.execute().body().getExpressions());
        } catch (IOException e) {
            e.printStackTrace();
        }

        return expressions;
    }
}
