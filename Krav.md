# App krav reflektion 

I denna fil kan du läsa om hur jag löst app kraven för denna uppgift och hur jag tänkt när jag gjorde de kraven. 

## krav 1: När app besöks i webbläsaren ska din prototyp renderas med React:
Detta krav är uppfyllt eftersom jag använt Vite som bundler när jag startade projektet. Vite är optimerat för React och konverterar min TSX-kod till javascript vilket gör att applikationen renderas korrekt i webbläsaren. 

## Krav 2: React-trädet som renderas ska bestå av minst 5 komponenter som du skrivit själv och som finns med i källkoden:
Detta krav hade jag ej löst när jag började med denna inlämning utan hade då bra fyra komponenter. Men för att klara det började jag fundera på vad för saker jag behöver för framtida grejer till min applikation. Kom då på att jag vill att användaren ska kunna skapa konto och logga in, bestämde mig då för att göra det till mitt projekt. Jag löste de igenom att jag skapade två mappar till i min components mapp. Dessa två mappar blev CreateAccount och Login i dessa skapade jag varsin TSX fil. 

Båda två filerna är uppbyggda väldigt lika, båda har var sitt form i sig. I create account så sparas de användaren fyllt i formuläret i localstorage. I då login så skriver användaren in de den vill logga in mer och då kontrolleras det som skrivits in med de som finns sparat i localstorage.

## Krav 3: Dina React komponenter är skriva med JSX syntaxen: 
Detta krav har jag klarat av genom att mina komponenter är skriva i .tsx vilket är typescript versionen av JSX. Syntaxen är nästan samma men med typning tillagd. 
Jag valde att använda TSX i stället för JSX för jag kände att jag behövde träna på att använda typning för tycker det är lite svårt fortfarande så därför valde jag just de. 

## Krav 4: Minst två av dina komponenter ska hantera ett event i javascript exempelvis från användaren: 
Jag uppfyller krav 4 genom att hantera onSubmit-event i både CreateAccount och login komponenterna. När användaren trycker på knappen för skapa konto eller logga in aktiveras submit-eventet. När den aktiveras använder jag preventDefault() för att förhindra att sidan laddas om. I CreateAccount sparas därefter användaren data, just nu sparas bara användarnamn och email. Lösenord har jag inte valt att spara för lösa de senare med backend. 

I login-komponenten jämförs användarens inmatade information med data som är sparad i localstorage för att kontrollera om användaren finns. Båda komponenterna reagerar alltså på användaren interaktion med formuläret. 

## Krav 5: Minst två av dina komponenter ska använda sig av state för att rendera tillståndsbaserad information: 
Uppfyller detta krav när jag använder Reacts useState för att hantera tillstånd i båda komponenterna i Login och CreateAccount. I CreateAccount använder jag state för flera variabler som emailInput, usernameInput och passwordInput. Jag har också med useState skapat accountCreated som kontrollerar om kontot skapades. 

I login komponenten har jag också använt useState där jag hanterar användarens input. Med hjälp av useState kan komponenten uppdateras direkt beroende på vad användaren skriver. Alltså använder både login och skapa konto komponenterna useState för att kunna hantera logga in och skapa konto. 

## Krav 6: En av dina komponenter använder sig av Lifecycle metod eller hook för att påverka en annan komponents tillstånd: 
Detta krav uppfyller jag genom att använda useEffect i kombination med useNavigate i CreateAccount komponenten. Jag använder dessa två i min kod när användaren skapat ett konto uppdateras variabeln accountCreated till true. Den förändringen triggar en useEffect som startar timern på två sekunder som sedan navigerar användaren till logga in sidan med hjälp av navigate(). Sen om använder väljer att byta sida in de två sekunder så bryts timern och användaren flyttas inte till login sidan. 

Jag har dessutom använt useEffect i layout komponenten för att uppdatera loggedInUser varje gång sidan ändras via useLocation. Detta påverkar vilken meny som ska visas i layouten. 

Vad det gör är att det påverkar applikationens flöde, vilket leder till att en annan komponent vissas. UseEffect påverkar i detta fall vilket komponentinnehåll som ska visas och det är i linje med hur reacts lifecycle hooks används. 

## Krav 7: Via en av komponenterna ska användaren kunna spara information i LocalStorage: 
Som jag nämnt tidigare i denna fil har jag sparat användaren email och username i localStorage. För att användaren ska kunna logga in. Jag sparade det igenom att när eventet på createAccount aktiveras på onSubmit så skapas det en user med email och username. Det användaren då skrivit in sparas i user som i sin tur sparas i localstorage. Det är hur jag löste att användaren ska kunna spara information i localStorage. 

## Krav 8: Informationen i LocalStorage används vid rendering av React-trädet:
Detta krav har jag gjort genom använda localstorage i min layout komponent. Där använder jag useEffect tillsammans med useLocation för att varje gång sidan ändras kontrollera om det finns en inloggad användare i localStorage. Om det finns en användare i localStorage så uppdateras useState loggedInUser och komponenten renderar olika menyval beroende på om användaren är inloggad eller inte. Sen om användaren är inloggad skrivs användaren som är inloggad username ut i meny jämte logga ut knappen för på visa vem är det som är inloggad. Det gör att vi hämtar användarnamnet som är sparat i localStorage och renderar det i menyn. 

Detta gör att detta påverkar vad som visas i React-trädet, exempelvis är en användare inloggad så ska den personen se en text med dens namn och logga ut knapp men är användaren inte inloggad så ska man kunna se logga in skapa konto i stället. 

## Krav 9 och 10: I app används egen css eller ett bibliotek för att ge dina komponenter stil, form och rörelser: 
Dessa två krav har jag uppfyllt i min app.css fil där jag skrivit all css själv. Att ge olika grejer på hemsidan stil och form tyckte jag var enkelt då jag gjort det för tidigare uppgifter. Samt så hade jag lagt till CSS för första inlämningen redan. Men däremot när jag skulle lägga till rörelse var det lite krångligare, löste det till slut igenom att skapa en div i createAccount och gav den ett id. Den div:en designade jag sedan i app.css. Det var ej så svårt med lite hjälp av google. 