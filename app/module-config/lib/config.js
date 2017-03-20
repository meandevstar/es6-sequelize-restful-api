export default {
    port: process.env.PORT || process.env.SERVER_PORT,
    postgres_uri: process.env.POSTGRES_URI,
    enc_salt: process.env.ENC_SALT,
    enc_algorithm: process.env.ENC_ALGO,
    jwt_secret: process.env.JWT_SECRET,
    jwt_algorithm: process.env.JWT_ALGO,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    run_mode: process.env.RUN_MODE
}
