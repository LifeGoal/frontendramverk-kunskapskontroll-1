# Inlämningsuppgift 1 - CRUD-applikation med API och routing

## Projektbeskrivning

Det här projektet är en React-applikation om *League of Legends*-champions. Användaren kan bläddra bland champions, se detaljer, skapa nya entries, redigera befintliga och ta bort dem via ett externt API.

Applikationen är byggd med React, React Router DOM, Axios och återanvändbara komponenter. API-anropen är separerade i egna filer och all CRUD-logik är samlad i ett tydligt API-lager.

## Namn

Viktor Lindqvist

## API som används

Projektet använder champion-data som hämtas via ett Supabase-baserat REST API med data från Riot Games / League of Legends.

## Funktioner som är implementerade

- Startsida med introduktion och navigering
- Lista med alla champions från API:et
- Detaljsida för en enskild champion med dynamisk route via `useParams()`
- Create-formulär för att lägga till en ny champion
- Update-formulär för att redigera en befintlig champion
- Delete-funktion för att ta bort champion från adminvyn
- Gemensam navigation med `NavLink`
- Loading states och felmeddelanden
- Validering i formulär innan submit
- Återanvändbara komponenter för listor, detaljer, navigation och formulär
- Custom hooks för återanvändbar datahämtning och submit-logik

## Instruktioner för att köra projektet

1. Installera beroenden:

```bash
npm install
```

2. Skapa en `.env`-fil i projektroten med följande variabler:

```env
REACT_APP_SUPABASE_URL=din_supabase_url
REACT_APP_SUPABASE_KEY=din_supabase_key
```

*OBS! En .env fil är redan skapad för denna applikation. Detta för att underlätta för den som ska/vill testa applikationen utan att be mig om API-nycklar med mera till mitt API. Detta kan komma att tas bort vid ett senare skede.*

3. Starta utvecklingsservern:

```bash
npm start
```

Alternativt:
```bash
npm run start
```

4. Öppna applikationen i webbläsaren:

```text
http://localhost:3000
```

*OBS! Detta sköts oftast automatiskt.*

## Kända buggar eller begränsningar

- Vissa champions/karaktärer har så kallade "Chromas" i sina skins. Dessa har inga bilder och kan därför inte visas i detalj-vyn. Jag har manuellt raderat en del från API:et, men det förekommer fortfarande en del.
- Applikationen kräver att miljövariablerna för Supabase är satta för att API-anrop ska fungera.
- CRUD-operationerna är beroende av att endpointen tillåter skrivningar och att datamodellen matchar formuläret.
- Eftersom projektet använder extern data kan vissa champions saknas eller innehållet ändras om API:t uppdateras.

## Utanför uppgiftsbeskrivning

Jag har själv skapat ett API som jag använder genom Supabase. Detta eftersom jag ville göra uppgiften på "rätt sätt". Jag ville arbeta på ett mer "verklighetsbaserat" plan, där jag inte bara sparar datan i useState, utan använder CRUD som om det vore ett riktigt projekt.

Detta API är endast skapat för denna uppgift. Så det använder sig kanske inte av världens säkraste metoder, policys med mera. Men det ska duga för detta åtminstone!

## Struktur i projektet

- `src/api/` - Axios-konfiguration och CRUD-funktioner
- `src/components/` - Återanvändbara UI-komponenter
- `src/hooks/` - Custom hooks för datahämtning och submit
- `src/pages/` - Sidor för routing och vyer

## Bygg och test

```bash
npm run build
npm test
```
