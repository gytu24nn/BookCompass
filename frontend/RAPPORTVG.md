# Källkodshantering & kod struktur för BookCompass

## Källkodshantering: 
För mitt projekt har jag valt att använda Git som metod för källkodshantering. Git är bra för att det är ett versionhanteringssystem som gör det möjligt att spåra de ändringar som görs i koden. Samt hantera olika versioner av projektet på ett effektivt sätt. Genom att använda Git kan jag enkelt återställa projektet till tidigare versioner om det blir problem. Det ger mig också möjligheten att hantera olika funktioner och versioner genom att skapa grenar. 

### Vald metod och teknik för projektets källkodshantering: 
För att jag ska kunna organisera och hantera min källkod under kursen på bästa sätt har jag valt att arbeta med Git Flow som arbetsmetod. Det är en etablerat arbetsflöde för Git som ger en bra struktur för att hantera olika utvecklingsgrenar. Jag kommer arbeta mycket med issues för att hålla koll på uppgifter och funktioner samt skapa grenar för att isolera arbetet på olika delar av projektet. 

Min plan för gren hanteringen utöver grenar för varje issue är att skapa en ny huvudgren för varje version eller inlämning, exempelvis en ny main gren kan heta "deploy-main" som baseras på den tidigare skapade huvudgrenen. På detta sätt kan jag bevara de olika inlämningarna/versionerna av projektet samtidigt som jag säkerställer att varje version har sin egen isolerade arbetsmiljö. Denna metod gör att jag får en tydlig översikt av alla versioner av projektet, vilket underlättar jämförelse och återgång till tidigare versioner vid behov.

Denna metod har jag arbetat med i en tidigare inlämning där vi gjorde två versioner av en inlämning och det var "Uppfinnaren". Jag tyckte att arbetade på det sättet fungerade väldigt bra och effektiv då jag kände att det hjälpte mig att hålla reda på saker och organisera mina projekt på ett bra sätt. 

Vid varje commit jag gör för en versions issue kommer vara väldokumenterade för att tydligt beskriva ändringar och vad det innebär. Detta gör det lättare att förstå ändringar vid senare tillfällen och underlättar för andra utvecklare om de behöver arbeta på projektet i framtiden. På detta sätt skapar jag en transparent och spårbar historik som underlättar vid framtida felsökningar och vidare utveckling.

## Javascript och kod struktur: 
Användningen av javascript ramverk där jag nu använder react påverkar kodens struktur väldigt mycket. Redan för en vecka sedan visste jag inte alls hur man använde react men när jag väl började använda de och lära mig de, tycker jag att det bara varit en positiv inverkan. 

Det olika ramverken påvekar oss på olika sätt men här är några punkter jag tycker det påverkar oss i på ett positivt sätt: 

- Lättare överskådlighet i filerna. I detta projekt har jag valt exempelvis att skapa varje meny val som en egen komponent. Vilket gör det enkelt att hitta bland alla filer.

- En annan bra grej är att man kan delar upp exempelvis meny, vyer & layout bland annat i olika komponenter vilket gör att man enkelt kan återanvända de på flera ställen och man slipper då skriva all kod igen. Detta gör koden mer modulär och lättare att utöka med nya funktioner utan att påverka hela applikationen. 

- Ramverken underlättar samarbeten för man kan då arbeta i olika filer utan att förstöra för varandra. Det blir tydligare vem som ansvarar för vilken del av applikationen, vilket förbättrar arbetsflödet i teamet.

- I till exempel react som är ett ramverk så finns det JSX och det gör att vi kan skriva HTML-liknande kod inom javascript. Detta förenklar utvecklingsprocessen, eftersom vi kan blanda struktur och logik i en enda komponent och på så sätt undvika att behöva skriva separata HTML- och javascript-filer.

Det finns många olika delar som påverkar vår användningen av javascript ramverk, men nu har jag bara testat på react och det tycker jag verkligen är ett ramverk med bra struktur. Genom att använda exempelvis React som ramverk för javascript får man en struktur som underlättar för framtida skalning av projekt. Vilket gör det enklare att lägga till nya funktioner utan att behöva omstrukturera koden. 
