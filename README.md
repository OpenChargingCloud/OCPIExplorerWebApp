# OCPI Explorer WebApp

This project implements the [**Open Charge Point Interface (OCPI)**](https://github.com/ocpi/ocpi) defined by the [EV Roaming Foundation](https://evroaming.org) as a web application using web technologies like Java-/TypeScript, HTML, and (S)CSS. The focus of this project is **testing** and **certification** of the OCPI protocol and 3rd party vendor extensions. This project supports the following protocol versions and extensions:

- [OCPI v2.1.1](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(under development)*
- [OCPI v2.2.1](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(under development)*
- [OCPI v2.3](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(under development)*
- [OCPI v3.0](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(planned)*


## Installation

With a recent Node.js installation, you can simply clone the repository, install the JavaScript dependencies, compile the code, and then run the webpack development server.

```
git clone https://github.com/OpenChargingCloud/OCPIExplorerWebApp.git
cd OCPIExplorerWebApp
npm install
npm run build
npm start
```

Your prefered web browser should automagically open http://localhost:1608


## Usage

The web app understands the following HTTP query parameters:

http://localhost:1608?url=https://api.example.org/ocpi2.1/versions&token=2435&nobase64


| Parameter | Example Value                            | Description                                                           |
|-----------|------------------------------------------|-----------------------------------------------------------------------|
| url       | https://api.example.org/ocpi2.1/versions | The OCPI versions URL.                                                |
| token     | abcd                                     | The OCPI access token.                                                |
| nobase64  |                                          | The OCPI access token will not be base64 encoded before transmission. |



## License

[GNU Affero General Public License)](LICENSE)
