function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value){
        throw new Error(`${name} is missing. Set it in .env`)
    }
    return value;
}

const credentials = {
    email: requiredEnv('E2E_EMAIL'),
    password: requiredEnv('E2E_PASSWORD'),
    invalidPassword: requiredEnv('E2E_INVALID_PASSWORD')
}

export { credentials };