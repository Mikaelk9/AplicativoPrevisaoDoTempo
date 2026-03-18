# Aplicativo de clima

Projeto front-end que consome uma API de previsão do tempo para exibir dados meteorológicos em tempo real, com foco em experiência do usuário e organização de dados.

## Índice

- [Visão geral](#visão-geral)
  - [Funcionalidades](#funcionalidades)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Detalhes técnicos](#detalhes-técnicos)  
- [Meu processo](#meu-processo)
  - [Construído com](#construído-com)
  - [O que eu aprendi](#o-que-eu-aprendi)
  - [Desenvolvimento contínuo](#desenvolvimento-contínuo)
  - [Recursos úteis](#recursos-úteis)
- [Autor](#autor)

---

## Visão geral

Este projeto consiste em um aplicativo de previsão do tempo que permite ao usuário buscar qualquer cidade e visualizar informações meteorológicas detalhadas, incluindo previsão atual, por hora e semanal.

O foco principal foi desenvolver uma aplicação dinâmica, responsiva e com boa experiência de uso, simulando comportamentos de aplicações reais.

### Funcionalidades

Os usuários podem:

- Buscar clima por cidade ou país
- Visualizar temperatura atual e condição do tempo
- Ver informações adicionais:
  - Sensação térmica
  - Umidade
  - Velocidade do vento
  - Precipitação
- Visualizar previsão para 7 dias
- Acompanhar previsão por hora (com seleção de dias)
- Alternar entre unidades (Celsius/Fahrenheit, km/h/mph)
- Utilizar a aplicação em diferentes tamanhos de tela (responsivo)
- Visualizar tratamento de erro em caso de falha na API ou busca inválida

---

### Screenshot

![](./preview.jpg)

---

### Links

- Visite o site em: [Weather app](https://aplicativo-previsao-do-tempo.vercel.app/)

---

## Detalhes técnicos

- Consumo da API Open-Meteo
- Manipulação dinâmica do DOM com JavaScript puro
- Controle de estados da interface (loading, sucesso, erro)
- Sistema de renderização de dados por:
  - Clima atual
  - Previsão por hora
  - Previsão semanal
- Mapeamento de códigos climáticos para ícones personalizados

## Meu processo

### Construído com

- **HTML5** – Estruturação semântica da aplicação.
- **CSS3** – Estilização, layout responsivo e animações.
- **JavaScript (ES6+)** – Manipulação do DOM e controle dinâmico de estados.
- **Google Fonts** – Tipografia personalizada.
- **API** – Open-Meteo para atualização de estados e informações meteorológicas.
- **Git & GitHub** – Versionamento e hospedagem do projeto.

---

### O que eu aprendi

- Como consumir e trabalhar com APIs externas
- Manipulação e atualização dinâmica do DOM
- Organização de dados complexos (horários, dias, clima)
- Criação de componentes reutilizáveis em JavaScript
- Implementação de estados de erro na interface

---

### Desenvolvimento contínuo

Possíveis melhorias futuras:

- Autocomplete com sugestões de cidades
- Modo dark/light automático
- Geolocalização automática do usuário
- Animações nos ícones climáticos
- Melhor organização do código em módulos (refatoração completa)

---

### Recursos úteis

- **Documentação da API:** - https://open-meteo.com/en/docs

---

## Autor

- Website - [Mikael Torres](https://portfolio-brown-eta-66.vercel.app/)

---
