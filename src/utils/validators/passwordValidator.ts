export function validatePassword(password:string) {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors:string[] = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long.`);
    }

    if (password.length > maxLength) {
        errors.push(`Password must be no more than ${maxLength} characters long.`);
    }

    if (!hasUpperCase) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    if (!hasLowerCase) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    if (!hasNumbers) {
        errors.push("Password must contain at least one number.");
    }

    if (!hasSpecialChars) {
        errors.push("Password must contain at least one special character.");
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}
