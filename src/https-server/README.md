Required files:

```
private-key.pem
cert.pem
```

How to generate these files?

```zsh
brew install mkcert
mkcert -install
mkcert -key-file private-key.pem -cert-file cert.pem localhost
```