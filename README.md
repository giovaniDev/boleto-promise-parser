Promise para fazer o parser dos dados do código de barras que vem do scanner, de acordo com as normas da FEBRABAN!

Veja no arquivo example como é simples usar! 

Para instalação basta utilizar o npm ou yarn

```
npm install boleto-promise-parser
```

ou:
```
yarn add boleto-promise-parser
```

v1.0.4:
Verificaçao de digito verificador geral aperfeiçoado! Agora a verifaçao é feita em duas etapas (modulo 10 e modulo 11).
v1.0.3:
Agora é retornado um novo campo: o segmento das guias, ex: Telecomunicaçoes, Saneamento, etc...