![Happy](.github/happy.png)

# Sobre o projeto


Happy é uma plataforma online para encontrar orfanatos e facilitar visitas, através de aparelhos celulares.

Nesse projeto tentei aprofundei a estrutura do backend para um design pattern mais robusto e utilizado no mercado.

O Mobile foi desenvolvido com React Native, utilizando na médida do possível o Design patter MVVM.

## 🛠 Tecnologias

### Mobile

As seguintes ferramentas foram usadas na construção do projeto:

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://docs.expo.dev/routing/introduction/)
- [Axios](https://axios-http.com/docs/intro)

### Backend

As seguintes ferramentas foram usadas na construção do projeto:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Typeorm](https://typeorm.io/)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js e npm](https://nodejs.org/en/).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/), e um emulador ou aparelho com o Expo Go instalado.

O projeto utiliza integração com o google maps, não esqueça de obter sua KEY no console do Google e adiciona-la ao `.env`.

### Executando o aplicativo

```bash
# Clone este repositório
$ git clone https://github.com/gustavosorati/happy

# Vá para a pasta backend e instale as dependências
$ npm install

# Execute o servidor
$ npm run start:dev

# Vá para a pasta happy, instale as dependências e gere o prebuild
$ npx expo prebuild

# Instale o aplicativo no seu emulador
$ npm run ios
$ npm run android
```
