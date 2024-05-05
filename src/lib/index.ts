export function stringToBigInt(str) {
    const bytes = new TextEncoder().encode(str);
    
    let result = 0n;
    for (let i = 0; i < bytes.length; i++) {
        result += BigInt(bytes[i]) << BigInt(8 * i);
    }
    return result;
}

export function bigIntToString(bigInt) {
    let bytes = [];
    while (bigInt > 0n) {
        bytes.push(Number(bigInt & 255n)); // Extract the lowest byte
        bigInt >>= 8n; // Shift right by 8 bits
    }

    return new TextDecoder().decode(Uint8Array.from(bytes.reverse()));
}

export function isPrime(n) {
  // Convert n to a BigInt if it's not already
  n = BigInt(n);

  // Check if n is 2 or 3
  if (n === 2n || n === 3n) {
    return true;
  }

  // Check if n is divisible by 2 or 3
  if (n % 2n === 0n || n % 3n === 0n) {
    return false;
  }

  // Iterate through potential factors starting from 5
  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) {
      return false;
    }
  }

  // If n passes all checks, it is prime
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

export function modInverse(e: bigint, phi: bigint): bigint | null {
    let a: bigint = e;
    let b: bigint = phi;
    let [x, y, u, v] = [0n, 1n, 1n, 0n];

    while (a !== 0n) {
        let q: bigint = BigInt(b) / BigInt(a);
        let r = BigInt(b) % BigInt(a);
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
    if (gcd !== 1n) {
        return null; // No mod inverse
    } else {
        return (x % phi + phi) % phi;
    }
}

export function generatePrime(from: bigint, to: bigint): bigint | null {
    const range = to - from + 1n;
    const randomNum = BigInt(Math.floor(Math.random() * Number(range))) + from;

    for (let i = 0n; i < range; i++) {
        const num = (randomNum + i) % range + from;
        if (isPrime(num)) return num;
    }
    return null; // No prime number found
}

function generateRandomPrimeInRange(from: bigint, to: bigint): bigint | null {
    if (from >= to) {
        return null;
    }

    const range = to - from + 1n;
    const maxAttempts = 1000; // Maximum attempts to find a prime number
    let attempt = 0;

    while (attempt < maxAttempts) {
        const randomNumber = BigInt(Math.floor(Math.random() * Number(range))) + from;
        if (isPrime(randomNumber)) {
            return randomNumber;
        }
        attempt++;
    }

    return null; // Failed to find a prime within the given range after maximum attempts
}

export function generateTwoPrimes(from: bigint, to: bigint): (bigint)[] {
    const prime1 = generateRandomPrimeInRange(from, to)!;
    const prime2 = generateRandomPrimeInRange(from, to)!;
    return [prime1, prime2];
}

export function convertStringToBigInt(str: string): bigint {
    try {
        let e = BigInt(str);
        if (e < 0n) e = -e;
        if (e === 0n) e = 1n;
        return e;
    } catch (error) {
        return 1n;
    }
}
