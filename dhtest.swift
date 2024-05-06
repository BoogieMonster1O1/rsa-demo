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

// Input public key values
print("Enter the value of g (generator):")
if let g = Int(readLine() ?? ""), g > 1 {
    print("Enter the value of p (prime number):")
    if let p = Int(readLine() ?? ""), p > 2 {
        // Test every possible value of a and b between 2 and p - 1
        for a in 2..<p {
            for b in 2..<p {
                let sharedSecret = computeSharedSecret(g: g, p: p, a: a, b: b)
                #print("For a = \(a), b = \(b), shared secret:", sharedSecret)
            }
        }
    } else {
        print("Invalid input for p.")
    }
} else {
    print("Invalid input for g.")
}
