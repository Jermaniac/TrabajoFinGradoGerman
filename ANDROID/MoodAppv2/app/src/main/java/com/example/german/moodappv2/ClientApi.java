package com.example.german.moodappv2;

import okhttp3.MultipartBody;
import retrofit2.Call;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface ClientApi {

    @Multipart
    @POST("getMood")
    Call<ArrayExpressions> sendRequest(@Part MultipartBody.Part photo);
}
