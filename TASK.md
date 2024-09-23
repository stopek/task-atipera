# Tabela Pierwiastków

## Opis
Przygotuj widok wyświetlający tabelę pierwiastków<br />
(kolumny `Number`, `Name`, `Weight`, `Symbol`).

Zasymuluj pobieranie danych do tabeli podczas startu aplikacji.

Dodaj możliwość edycji dowolnej wartości rekordu wyświetlonego w tabeli (popup + input do zmiany wartości).
Po zatwierdzeniu zmiany, wiersz tabeli powinien się zaktualizować.
Edycja powinna odbywać się bez mutowania danych.

Dodaj filtr, który pozwoli na filtrowanie wyników (jeden input filtrujący po wszystkich polach). Filtrowanie powinno odbywać się po 2s bez zmiany wartości w inpucie.

## Dane początkowe
```typescript
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
```
Jako bibliotekę do komponentów użyj https://material.angular.io/

Zadanie do napisania w `Angular 18.2.2`.
Nie piszemy testów do kodu.
Dane, które na start wciągamy z mocka, chce trzymać w stanie aplikacji.

Proszę pamiętać, że odpowiedzialność za zarządzanie subskrypcjami chcemy przekazywać dla frameworków jak to tylko możliwe. Bardzo rzadko powinniśmy pisać .subscribe ()

Proszę do powyższych punktów użyć https://www.rx-angular.io/.<br />
Jest to zbiór pakietów, który będzie Pani/Pan używać w projekcie.
