/**
 * @return {number}
 */
export function RoundUnits(number) {
    return number >= 10 ? Math.round(number) : number.toFixed(1);
}

