import Foundation

func computeSharedSecret(g: Int, p: Int, a: Int, b: Int) -> Int {
    // Compute partial keys
    let A = Int(pow(Double(g), Double(a)).truncatingRemainder(dividingBy: Double(p)))
    let B = Int(pow(Double(g), Double(b)).truncatingRemainder(dividingBy: Double(p)))

    // Compute shared secret
    let sharedSecretA = Int(pow(Double(B), Double(a)).truncatingRemainder(dividingBy: Double(p)))
    let sharedSecretB = Int(pow(Double(A), Double(b)).truncatingRemainder(dividingBy: Double(p)))

    // Ensure both parties compute the same shared secret
    assert(sharedSecretA == sharedSecretB)

    return sharedSecretA
}

// Input private keys a and b
print("Enter the private key a for party A:")
if let a = Int(readLine() ?? "") {
    print("Enter the private key b for party B:")
    if let b = Int(readLine() ?? "") {
        // Given public key values
        let g = 5
        let p = 23

        // Compute and print the shared secret
        let sharedSecret = computeSharedSecret(g: g, p: p, a: a, b: b)
        print("Shared secret:", sharedSecret)
    } else {
        print("Invalid input for b.")
    }
} else {
    print("Invalid input for a.")
}
