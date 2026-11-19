# Revisão Programação para Dispositivos Móveis - PDM

**App: Clima Agora** - busca cidades, mostra o clima atual e a previsão dos próximos 7 dias, e guarda as cidades favoritas.

## Como rodar

```bash
npm install
npx expo start
```

O app usa dados falsos (`src/mock.ts`) e funciona sem internet. Para usar a API real do [Open-Meteo](https://open-meteo.com) (gratuita, sem chave), troque `USE_MOCK` para `false` em `src/api.ts`.

Cidades do mock: `Fortaleza`, `Iguatu`, `Cedro` (CE), `Cedro` (PE), `Crato`, `Juazeiro do Norte`, `Gramado`, `Atlântida`.
A busca acontece **enquanto você digita**, a partir de 2 letras (ex.: `fo`, `cedro`, `gra`, `atl`).

## Estrutura

O app segue MVVM: cada tela tem uma View (`*Screen.tsx`) e um ViewModel (`use*ViewModel.ts`) com o estado e a lógica. A lista de favoritas fica no `App.tsx` e é passada para as telas por props.

```
App.tsx                                        -> abas (Buscar / Favoritas), favoritas e abre a previsão
src/api.ts                                     -> Model: busca os dados (API real ou mock)
src/mock.ts                                    -> dados falsos (não altere)
src/utils.ts                                   -> temperatura, data e descrição do clima
src/theme.ts                                   -> cores, raios e sombra usados nas telas
src/modules/search/SearchScreen.tsx            -> View da busca
src/modules/search/useSearchViewModel.ts       -> ViewModel da busca
src/modules/forecast/ForecastScreen.tsx        -> View da previsão
src/modules/forecast/useForecastViewModel.ts   -> ViewModel da previsão
src/modules/favorites/FavoritesScreen.tsx      -> View das favoritas
src/modules/favorites/useFavoritesViewModel.ts -> ViewModel das favoritas
src/components/CityCard.tsx                    -> card de cidade (busca e favoritas)
src/components/DayItem.tsx                     -> card de um dia da previsão
src/components/TabBar.tsx                      -> barra de abas
src/components/EmptyState.tsx                  -> mensagem de lista vazia
```

## Regras

- Não altere `src/mock.ts`.
- Não instale bibliotecas.
- Não renomeie arquivos, funções ou componentes.
- No final, o app deve abrir sem erros e sem avisos vermelhos/amarelos no terminal.

---

## Parte 1 - Corrigir erros

Encontre a causa de cada problema e corrija.

### Questão 01 - Uma busca para cada letra (`src/modules/search/useSearchViewModel.ts`)

Ao digitar `fortaleza`, o terminal mostra `Buscando cidades: fo`, `Buscando cidades: for`, `Buscando cidades: fort`... uma busca para cada letra. A busca deve acontecer **uma vez só**, 500 ms depois que a pessoa **parar de digitar**.

Dica: a função que o `useEffect` retorna roda antes da próxima execução do efeito. Use `clearTimeout`.

### Questão 02 - Aviso de chave repetida (`src/modules/search/SearchScreen.tsx`)

Ao buscar `cedro`, aparece o aviso _"Encountered two children with the same key, `Cedro`"_. Existem duas cidades chamadas Cedro (uma no Ceará e outra em Pernambuco). Cada item da lista precisa de uma chave **única**.

### Questão 03 - Estrela de favorito não muda (`App.tsx`)

Na busca, ao tocar na ☆ de uma cidade, nada muda: ela não vira ★ e o número não aparece na aba "Favoritas". A estrela e a aba devem atualizar **na hora**. Tocar de novo deve desfavoritar.

Dica: `push` e `splice` mudam o array que já está no estado. O React só atualiza a tela quando recebe um array **novo**.

### Questão 04 - Tela vermelha ao abrir uma cidade (`src/modules/forecast/ForecastScreen.tsx`)

Ao abrir `Fortaleza`, aparece "Carregando previsão..." e depois o erro _"Rendered more hooks than during the previous render"_. Corrija **sem remover** o `useState`.

(`Atlântida` não quebra porque cai na tela de erro: _"Previsão indisponível para esta cidade."_)

Dica: hooks (`useState`, `useEffect`...) devem ficar no começo do componente, antes de qualquer `return`.

### Questão 05 - Switch "Mostrar em °F" não liga (`src/modules/forecast/ForecastScreen.tsx`)

Depois da Questão 04, ao tocar no switch "Mostrar em °F", ele volta sozinho para desligado e a temperatura continua em °C. Ao tocar, o switch deve ligar e as temperaturas devem passar para °F. Tocar de novo volta para °C.

Dica: o `Switch` é controlado pelo `value`. Para ele mudar, é preciso avisar o estado quando a pessoa toca (`onValueChange`).

### Questão 06 - Temperatura em °F errada (`src/utils.ts`)

Depois da Questão 05, ao ligar "Mostrar em °F" em `Fortaleza`, a temperatura vira **1028°F**. Corrija `formatTemperature` usando a fórmula **°F = °C × 9 / 5 + 32**:
`30.4 → "87°"`, `0 → "32°"`, `100 → "212°"`, `-40 → "-40°"`.

Dica: confira a ordem das operações e os parênteses.

---

## Parte 2 - Implementar o que falta

Procure os comentários `// TODO Questão NN` no código.

### Questão 07 - Previsão dos próximos dias (`src/api.ts`)

A tela da previsão mostra **"Próximos 0 dias"**. A API devolve os dias em **listas separadas**: a posição `i` de cada lista é o mesmo dia.

```json
"daily": {
  "time": ["2026-11-19", "2026-11-20", "..."],
  "weather_code": [2, 1, "..."],
  "temperature_2m_max": [31.2, 31.0, "..."],
  "temperature_2m_min": [25.1, 25.4, "..."],
  "precipitation_probability_max": [10, 5, "..."]
}
```

Em `toForecast`, preencha `days` com uma lista de `DailyForecast` (um objeto por dia). Na API real, a chance de chuva pode vir `null`: nesse caso, use `0`.

Esperado: em `Fortaleza`, aparece **"Próximos 7 dias"**; o primeiro dia é `2026-11-19` (máx. 31.2, mín. 25.1, 10% de chuva) e o último é `2026-11-25`. Os cards aparecem depois da Questão 08.

Dica: `data.daily.time.map((date, i) => ...)`.

### Questão 08 - Componente DayItem (`src/components/DayItem.tsx`)

Hoje retorna `null`. Mostre, numa linha, dentro de um card igual ao do `CityCard` (fundo branco, borda cinza, cantos arredondados):

- a data com `formatDate` em negrito, ou **"Hoje"** se `isToday` for `true`; embaixo, a chance de chuva no formato `💧 10%`;
- o emoji de `weatherInfo(day.weatherCode)`;
- a mínima, uma barra e a máxima, com `formatTemperature` (devem mudar quando o switch "Mostrar em °F" for ligado);
- a barra: um trilho cinza com um trecho colorido que vai da mínima até a máxima do dia, na escala da semana (`weekMin` até `weekMax`):
  - início do trecho (`left`): `(min - weekMin) / (weekMax - weekMin)`, em %;
  - tamanho do trecho (`width`): `(max - min) / (weekMax - weekMin)`, em %.

Esperado: em `Gramado`, o trecho de **seg, 23/11** começa no início do trilho, e o de **qua, 25/11** termina no fim do trilho.

Dica: um estilo pode ser calculado na hora: `style={[styles.fill, { left: `${left}%` }]}`.

### Questão 09 - Descrição do clima (`src/utils.ts`)

Hoje toda cidade aparece como **🌡️ Indefinido**. Implemente `weatherInfo(code)` seguindo a tabela:

| Código | Descrição | Emoji |
|---|---|---|
| 0 | Céu limpo | ☀️ |
| 1 | Poucas nuvens | 🌤️ |
| 2 | Parcialmente nublado | ⛅ |
| 3 | Nublado | ☁️ |
| 45 ou 48 | Neblina | 🌫️ |
| 51 a 57 | Garoa | 🌦️ |
| 61 a 67 | Chuva | 🌧️ |
| 80 a 82 | Pancadas de chuva | 🌦️ |
| 95 a 99 | Trovoada | ⛈️ |
| qualquer outro | Indefinido | 🌡️ |

Esperado: `Fortaleza` → ⛅ Parcialmente nublado, `Iguatu` → ☀️ Céu limpo, `Crato` → 🌧️ Chuva, `Gramado` → 🌫️ Neblina.

### Questão 10 - Confirmar antes de remover (`src/modules/favorites/useFavoritesViewModel.ts`)

Na aba "Favoritas", tocar na ★ remove a cidade na hora. Antes de remover, mostre um alerta com o título **"Remover favorita"**, a mensagem **"Deseja remover Fortaleza das favoritas?"** (com o nome da cidade) e os botões **"Cancelar"** e **"Remover"** (estilo `destructive`). Só remova se a pessoa tocar em "Remover".

Dica: `Alert.alert` do `react-native`.
