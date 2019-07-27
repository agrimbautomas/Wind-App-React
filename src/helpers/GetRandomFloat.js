export function GetRandomFloat(min, max) {
    let num = Math.random() * (max - min) + min;
    console.log(num.toFixed(2));
    return num.toFixed(2);
}

