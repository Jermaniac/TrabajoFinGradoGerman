package com.example.german.moodappv2;

public class Expression {
    private String mood;
    private double probability;

    public Expression(String mood, double probability) {
        super();
        this.mood = mood;
        this.probability = probability;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public double getProbability() {
        return probability;
    }

    public void setProbability(double probability) {
        this.probability = probability;
    }

}
