# Regras de Reuso de Código & Pesquisa Prévia (Search-First)

## Diretrizes de Pesquisa
- Antes de criar qualquer nova função utilitária, helper, componente de UI ou instalar uma nova dependência, você DEVE buscar no projeto se já existe algo semelhante implementado em `src/core/` ou declarado no `package.json` (ou correspondente).
- Evite escrever lógica complexa do zero (ex: regex de validação de e-mail, parser de datas complexas) se houver uma biblioteca padrão já instalada ou amplamente adotada pela comunidade.
- Se uma biblioteca externa for instalada, encapsule-a em um wrapper/adapter dentro de `src/services/` para evitar acoplamento direto com as regras de negócio dos módulos.

## Regra de Promoção de Código
- Lógica de negócio ou componentes específicos devem viver encapsulados em seu respectivo módulo em `src/modules/[modulo]/`.
- Se um componente, hook ou utilitário passar a ser utilizado por **2 ou mais módulos diferentes**, ele deve ser **promovido** para `src/core/` correspondente.

## Passe de Limpeza (De-sloppify)
- Toda vez que terminar de escrever uma funcionalidade e antes de criar o commit final, faça um passe de limpeza no código.
- Remova logs de depuração temporários (ex: `console.log`, `print`, `debugger`).
- Remova comentários óbvios que apenas descrevem literalmente o que a linha de código abaixo faz.
- Remova checagens defensivas ou testes redundantes que não agregam valor real à lógica de negócio.
