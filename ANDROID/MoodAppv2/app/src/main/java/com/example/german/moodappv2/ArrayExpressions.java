package com.example.german.moodappv2;

import java.util.List;

public class ArrayExpressions {
    private List<Expression> expressions ;

    public ArrayExpressions(List<Expression> expressions) {
        super();
        this.expressions = expressions;
    }

    public List<Expression> getExpressions() {
        return expressions;
    }

    public void setExpressions(List<Expression> expressions) {
        this.expressions = expressions;
    }

}
