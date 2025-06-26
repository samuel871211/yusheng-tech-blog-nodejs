Required files:

```
private-key.pem
cert.pem
```

How to generate these files with trusted CA?

Mac

```zsh
brew install mkcert
brew install nss # to work on firefox
mkcert -install
mkcert -key-file private-key.pem -cert-file cert.pem localhost
```

Windows

```powershell
choco install mkcert
# choco install nss 會失敗，但反正先不用 firefox 測試
```

How to generate these files with untrusted CA?

```zsh
# 產生私鑰
openssl genrsa -out private-key.pem 2048

# 產生自簽憑證
openssl req -new -x509 -key private-key.pem -out cert.pem -days 365
```
