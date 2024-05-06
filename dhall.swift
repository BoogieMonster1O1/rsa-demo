import Foundation

func modExp(base: Int, exponent: Int, modulus: Int) -> Int {
    var result = 1
    var base = base % modulus
    var exp = exponent
    
    while exp > 0 {
        if exp % 2 == 1 {
            result = (result * base) % modulus
        }
        base = (base * base) % modulus
        exp /= 2
    }
    return result
}

func computeSharedSecret(g: Int, p: Int, a: Int, b: Int) -> Int {
    // Compute partial keys
    let A = modExp(base: g, exponent: a, modulus: p)
    let B = modExp(base: g, exponent: b, modulus: p)

    // Compute shared secret
    let sharedSecretA = modExp(base: B, exponent: a, modulus: p)
    let sharedSecretB = modExp(base: A, exponent: b, modulus: p)

    // Ensure both parties compute the same shared secret
    assert(sharedSecretA == sharedSecretB)

    return sharedSecretA
}

// Given public key values
let g = 5
let p = 23

// Test every possible value of a and b between 2 and 20
for a in 2...20 {
    for b in 2...20 {
        let sharedSecret = computeSharedSecret(g: g, p: p, a: a, b: b)
        print("For a = \(a), b = \(b), shared secret:", sharedSecret)
    }
}
