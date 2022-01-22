let sum = (a, b) => a + b;

function divide(a, b){
    if(b == 0){
        throw new Error('division by zero');
    }

    return a / b;
}

export function mathOp(a, b, op){
    switch(op){
        case '+':
            return sum(a, b);
        case '/':
            return divide(a, b);
    }
}
