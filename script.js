const generatePassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const password = [];
    const values = new Uint32Array(length);

    window.crypto.getRandomValues(values);

    for (let i = 0; i < length; i++) {
        password.push(charset[values[i] % charset.length]);
    }

    return password.join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const passwordLengthInput = document.getElementById('passwordLength');

    generateBtn.addEventListener('click', () => {
        const length = parseInt(passwordLengthInput.value, 10);
        const newPassword = generatePassword(length);
        passwordInput.value = newPassword;
    });

    copyBtn.addEventListener('click', () => {
        passwordInput.select();
        document.execCommand('copy');
        
        // For modern browsers
        navigator.clipboard.writeText(passwordInput.value)
            .then(() => {
                alert('Password copied to clipboard!');
            })
            .catch((err) => {
                console.error('Unable to copy to clipboard', err);
            });
    });
});
