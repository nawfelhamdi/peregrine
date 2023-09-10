const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
import path from "path";
import { CustomError } from "../utils/CustomError";

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

function getSigningKeyPromise(kid, client) {
    return new Promise((resolve, reject) => {
        try {
            client.getSigningKey(kid, (err, key) => {
                try {
                    if (err) {
                        reject(err);
                    }
                    const signingKey = key.publicKey || key.rsaPublicKey;
                    resolve(signingKey);
                }
                catch (err) {
                    
                    reject(err);
                }
            });
        }
        catch (err) {
            reject(err);
        }
    });
}

const verifyToken  = async (idToken) => {
    let decodedAndVerified = null;
    let parsed = jwt.decode(idToken, { complete: true });
    let kid = parsed.header.kid;

    const client = jwksClient({
        strictSsl: true, 
        jwksUri: process.env.JWKS_CLIENT_URL,
    });

    let signingKey = await getSigningKeyPromise(kid, client);
    try {
        decodedAndVerified = jwt.verify(idToken, signingKey)
    } catch (error) {
        const customError = new CustomError(
            "Token expired",
            401,
            null,
          );
         throw customError
    }
    
       
    if (!decodedAndVerified) {
        throw Error("verification returned null");
    }

    return decodedAndVerified;
}


module.exports = async (req, res, next) => {
    let decodedAndVerified = null;
    try {
        var auth = req.headers.authorization;

        let idToken = auth.substring(7);
        let result = await verifyToken(idToken);
        if (!result) {
            const customError = new CustomError(
            "Invalid token",
            401,
            result,
          );
         return next(customError);
        }
        req.userData = result;
        next();
    }
    catch (err) {
        console.log(err)
        const customError = new CustomError(
            "Auth failed",
            401,
            err,
          );
         return next(customError);
    }
}