import CryptoJs from 'crypto-js'
import JSEncrypt from 'jsencrypt'

function encryptByDES(message, key = '%Q!vUHNJ#$CENBnA') {
  const keyHex = CryptoJs.enc.Utf8.parse(key);
  const encrypted = CryptoJs.TripleDES.encrypt(message, keyHex, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  })
  return encrypted.ciphertext.toString();
}

function decryptByDES(ciphertext, key = '%Q!vUHNJ#$CENBnA') {
  const keyHex = CryptoJs.enc.Utf8.parse(key);
  const decrypted = CryptoJs.TripleDES.decrypt(CryptoJs.enc.Base64.stringify(CryptoJs.enc.Hex.parse(ciphertext)), keyHex, {
    mode: CryptoJs.mode.ECB,
    padding: CryptoJs.pad.Pkcs7
  })
  return decrypted.toString(CryptoJs.enc.Utf8);
}

function rsaEncrypt(data, pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgsi1chXhVrTKmEhGejZqP+lgL
hHtO4hX/jxbqdTwlpLdtiSectjw+TX+C+KWRzQptanfPD4bZbRv/2c5iyzYoIB0O
ojOcLUnAEKvdMnupu0OvyWYIG10Mk5rvBU//PyEO14ythHvlvl6pa07y2vCacVgf
N8Y4Ifg1OgGHFndP1QIDAQAB
-----END PUBLIC KEY-----
`) {
  let encryptor = new JSEncrypt()
  encryptor.setPublicKey(pubKey)
  return encryptor.encrypt(data);
}

function rsaDecrypt(data, priKey = `-----BEGIN PRIVATE KEY-----
MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKCyLVyFeFWtMqYS
EZ6Nmo/6WAuEe07iFf+PFup1PCWkt22JJ5y2PD5Nf4L4pZHNCm1qd88PhtltG//Z
zmLLNiggHQ6iM5wtScAQq90ye6m7Q6/JZggbXQyTmu8FT/8/IQ7XjK2Ee+W+Xqlr
TvLa8JpxWB83xjgh+DU6AYcWd0/VAgMBAAECgYB/r1QP0hXdrfMyteS+ITIQ+RCA
hlIcSdTE7YN95I1YM9tz86lAAiU4NAf/n2afxVZlvlVYd7Pki6fV0dEF+wYZ9WrL
0w+i6GocyP/5LO9rbPYSW+v38gVdYfNtXYea6Gngtx/Hb4oKNapQBhCmPGgQN6j9
DUpSUs1I/yisqDI/QQJBANK9nCpmQlhBS5KAOf++1fxFEPfCF2V8sLTs5ORepajN
AAhfoqP8TNWYyXE/OAHAG6WGBTqlbx48wnbKJ46QG/0CQQDDNSSgoMCbhQrUuqU6
nr0raBBXUR1jSiViJEZRBGwU2EFrmmwrZwSkR5AKGq5x4aXrceFnP+pttwtikVki
vE65AkAZjr09tyEcqu6LWdmu1moFKisgoP1NZY3Yo1IvD/tvOU1jtpV25cY7sUfc
4BnevHmd3V8M+bs8I4pB9cpOU9PRAkAtnTNr3WRkctgvEVYeto0ZoX2ACdJGK0NF
BZjwwYnH7SiMTk9MbQwmnxpHYii1L7cnpzq2d7b94DHm3HPpq/rxAkB+b5ml+Vvd
Np7oFJFREuhh+0Ku145gc6HOYcUcOfEK9T5KUMlcLyri7jjGNMWtg3N0i9taUhbe
gYMNPGcLhkfk
-----END PRIVATE KEY-----
`) {
  let decryptor = new JSEncrypt();
  decryptor.setPrivateKey(priKey)
  return decryptor.decrypt(data);
}

export {
  rsaDecrypt,
  rsaEncrypt,
  encryptByDES,
  decryptByDES
}