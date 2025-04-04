import homeImg from '../../img/home.png'
import communityImg from '../../img/community.png'
import mylibraryImg from '../../img/mylibrary.png'
import GoodreadsInspoImg from '../../img/GoodreadsInspo.png'

const Inspiration = () => {
    return(
        <div className='inspiration-container'>
            <h3>Inspiration</h3>
            <p>
                BookCompass är tänkt att vara en trygg och inspirerande plats för alla bokälskare.
                Här ska du enkelt kunna hitta nya favoritböcker, organisera din läsning och känna dig som en del av ett större litterärt sammanhang.
                <br /><br />
                Inspirationen till designen har jag hämtat från bland annat Goodreads, men också från sådant jag själv har saknat på liknande plattformar.
                BookCompass ska vara en användarvänlig hemsida med en lugn och varm färgpalett som förstärker känslan av trygghet och gemenskap.
                <br /><br />
                Designen är utformad för att vara enkel att navigera, så att varje användare snabbt hittar rätt och får en positiv upplevelse, 
                varje gång de loggar in.
            </p>
            
            <div className='inspoImg'>
                <h3>Bilder från min figma och ett foto på Goodreads:</h3>
                <img src={homeImg} alt="Home page design Figma" width={300} />
                <img src={communityImg} alt="Community page design Figma" width={300}/>
                <img src={mylibraryImg} alt="My library page design Figma" width={300} />
                <img src={GoodreadsInspoImg} alt="Goodreads inspiration" width={470} />

            </div>
            
        </div>
    )
}

export default Inspiration;