# OCPI Explorer WebApp

This project implements the [**Open Charge Point Interface (OCPI)**](https://github.com/ocpi/ocpi) defined by the [EV Roaming Foundation](https://evroaming.org) using [Electron](https://www.electronjs.org), a cross platform Open Source framework for creating native applications with web technologies like Java-/TypeScript, HTML, and (S)CSS. The focus of this project is **testing** and **certification** of the OCPI protocol and 3rd party vendor extensions. This project supports the following protocol versions and extensions:

- [OCPI v2.1.1](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(under development)*
- [OCPI v2.2.1](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(under development)*
- [OCPI v2.3](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(planned)*
- [OCPI v3.0](https://github.com/ocpi/ocpi/tree/release-2.1.1-bugfixes) *(planned)*


## Installation

Assuming you have a current Node.js (~v21.7) installation you can just clone this git repository, install all the JavaScript dependencies, compile it and run the webpack development server...

```
git clone https://github.com/OpenChargingCloud/OCPIExplorerWebApp.git
cd OCPIExplorerWebApp
npm install
npm run build
npm start
```

Your prefered web browser should automagically open http://localhost:1608

