import Cookies from "js-cookie"
const TokenKey = "x-access-token";
const defaultData = new Date(new Date().getTime() + 120 * 60 * 1000)

function setCookie(key = TokenKey, value, data = defaultData) {
    Cookies.set(key, value, { expires: data })
}

function getCookit(key = TokenKey) {
    return Cookies.get(key);
}

function removeCookit(key = TokenKey) {
    Cookies.remove(key)
}

export {
    setCookie,
    getCookit,
    removeCookit
}