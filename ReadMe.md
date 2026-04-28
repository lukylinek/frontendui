# ProjectGQLModel – Read-only stránka

## Zadání
Úkolem bylo vytvořit read-only stránku pro zobrazení entity v rámci existující frontendové aplikace.  
Pracovali jsme s entitou `ProjectGQLModel`.

Projekt nebyl vytvářen od nuly – většina věcí (routing, základní komponenty, GraphQL napojení) už byla připravená. Naším úkolem bylo se v projektu zorientovat a upravit / doplnit část pro zobrazení konkrétní entity.

---

## Postup práce

### 02.04. 2026 – Seznámení s projektem
Nejdřív jsme se snažili pochopit strukturu projektu.  
Bylo potřeba zjistit, jak funguje:

- routing (`RouterSegments`)
- napojení na GraphQL
- základní page komponenty

Nejtěžší část byla orientace v cizím kódu.

---

### 11. 4. 2026 – Routing a zobrazení stránky
Řešili jsme, jak se dostat na detail entity.

Zjistili jsme, že detail stránky funguje přes URL:

Po úpravě routing části se nám podařilo stránku otevřít.  
Ze začátku jsme narazili na problém s bílou obrazovkou, který byl způsoben špatnou nebo chybějící route.

---

### 12. 4. 2026 – GraphQL fragmenty
Další krok byl pochopit, jak se načítají data.

Použili jsme fragmenty:

- `Link` – základní atributy
- `Medium` – rozšíření o RBAC objekt
- `Large` – připravený pro další rozšíření

Díky tomu jsme pochopili, jaká data máme k dispozici na frontendové straně.

---

### 13. 4. 2026 – Úprava read stránky
Hlavní část práce probíhala v komponentě:

Nejdřív jsme zobrazovali jen základní hodnoty:
- ID
- název
- datum

Postupně jsme stránku upravili:
- rozdělili jsme data do sekcí
- vytvořili jsme jednoduché komponenty pro zobrazení hodnot
- upravili jsme formát datumu

---

### 13. 4. 2026 – Generické zobrazení dat
Nakonec jsme stránku upravili tak, aby nebyla závislá jen na jednom modelu.

Implementovali jsme:
- rozlišení typů dat (scalar / array / object)
- automatické zobrazení podle typu
- jednoduchý tree view pro strukturu dat

Díky tomu je stránka univerzálnější.

---

## Jak stránka funguje

Stránka načte entitu podle ID z URL a zobrazí ji v několika částech:

- **TREE** – struktura entity
- **Skalární atributy** – jednoduché hodnoty
- **Vektorové atributy** – pole (seznamy)
- **Objektové atributy** – vnořené objekty

Výhodou je, že není potřeba ručně definovat každé pole.

---

## Problémy

### Bílá obrazovka
Na začátku se stránka nezobrazovala.  
Problém byl v nesprávně nastaveném routingu.

---

### Prázdná data
Některé části stránky (např. role) byly prázdné.  
Nebyla to chyba v kódu, ale tím, že backend nevracel žádná data.

---

### Orientace v projektu
Nejtěžší bylo pochopit strukturu projektu, protože jsme pracovali s existujícím kódem.

---

## Výsledek

Výsledkem je stránka, která:

- načte entitu podle ID
- zobrazí ji v read-only režimu
- rozlišuje typy dat
- umožňuje zobrazit i složitější struktury

---

## Zhodnocení

V rámci projektu jsme si vyzkoušeli:

- práci s GraphQL
- napojení frontend ↔ backend
- práci s existujícím kódem
- návrh zobrazení dat

---

## Možná vylepšení

Do budoucna by bylo možné:
- doplnit editaci dalších atributů, například datumu, typu projektu nebo stavu dokončení
- přidat výběrové pole pro typ projektu
- přidat checkbox pro atribut `done`
- doplnit create a delete mutace
- lépe vyřešit oprávnění přes RBAC
- upravit design tak, aby byl sjednocený se zbytkem aplikace

---

## Shrnutí

Neimplementovali jsme celý projekt od začátku, ale naučili jsme se:

**správně se zorientovat v existující aplikaci, napojit konkrétní entitu a upravit read-only stránku pro její zobrazení**


---

# Aktualizace projektu – vlastní layout a update mutace

## 28. 4. 2026 – Přechod na nový backend stack

Při dalším testování jsme zjistili, že původní `docker-compose.yml` ve frontendovém repozitáři neobsahoval službu pro projekty. Kvůli tomu backend neznal typy jako:

- `ProjectGQLModel`
- `ProjectInputFilter`
- `projectPage`

Frontend tedy měl připravenou stránku i GraphQL query, ale Apollo gateway neměla připojenou backend službu, která by model `ProjectGQLModel` poskytovala.

Problém se vyřešil použitím backend/data stacku z repozitáře `_uois`, konkrétně přes:

Výsledkem je stránka, která:
- načte entitu `ProjectGQLModel` podle ID
- zobrazí ji v přehledném detailním layoutu
- zobrazuje základní informace o projektu
- zobrazuje navázané podprojekty
- umožňuje přejít do editace
- umožňuje upravit atribut `name`
- ukládá změnu přes GraphQL mutaci `projectUpdate`
- pracuje s `id` a `lastchange`, které jsou nutné pro bezpečný update