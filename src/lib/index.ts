export function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
        i += 6;
    }
    return true;
}

export function coprime(a: number, b: number): boolean {
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a === 1;
}

export function modInverse(e: number, phi: number): number | null {
    let a = e;
    let b = phi;
    let [x, y, u, v] = [0, 1, 1, 0];

    while (a !== 0) {
        let q = Math.floor(b / a);
        let r = b % a;
        let m = x - u * q;
        let n = y - v * q;

        b = a;
        a = r;
        x = u;
        y = v;
        u = m;
        v = n;
    }

    const gcd = b;
    if (gcd !== 1) {
        return null; // No mod inverse
    } else {
        return (x % phi + phi) % phi;
    }
}

export function generatePrime(from: number, to: number): number | null {
    const range = to - from + 1;
    const randomNum = Math.floor(Math.random() * range) + from;

    for (let i = 0; i < range; i++) {
        const num = (randomNum + i) % range + from;
        if (isPrime(num)) return num;
    }
    return null; // No prime number found
}

export function generateTwoPrimes(from: number, to: number): (number | null)[] {
    const prime1 = generatePrime(from, to);
    const prime2 = generatePrime(from, to);
    return [prime1, prime2];
}

export function convertStringToBigInt(str: string): bigint {
    try {
        return BigInt(str);
    } catch (error) {
        return 1n;
    }
}
