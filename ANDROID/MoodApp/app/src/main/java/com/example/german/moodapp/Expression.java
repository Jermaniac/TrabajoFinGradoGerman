package com.example.german.moodapp;

import org.json.JSONException;
import org.json.JSONObject;

class Expression {
    private String mood;
    private Double probability;

    public Expression(JSONObject json) throws JSONException {
        this.mood = json.getString("mood");
        this.probability = json.getDouble("probability");
    }

    public String getMood() {
        return mood;
    }

    public Double getProbability() {
        return probability;
    }
}
