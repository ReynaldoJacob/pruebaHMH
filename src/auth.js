import VueCookies  from 'vue-cookies';
export function checkUserAuthentication() {
    // Aquí puedes implementar tu lógica de autenticación.
    // Por ejemplo, podrías verificar si hay un token de sesión válido almacenado.
    // Devuelve true si el usuario está autenticado, de lo contrario, devuelve false.
    const sessionToken = VueCookies.get('sessionToken');
    return sessionToken !== null && sessionToken !== undefined;
}