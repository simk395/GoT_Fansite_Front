import React, { Component } from 'react'
import objectFitImages from 'object-fit-images'
import { jarallax } from 'jarallax'
import SnowStorm from 'react-snowstorm';
import starkBanner from '../images/house_banners/house-stark.jpg'
import greyjoyBanner from '../images/house_banners/house-greyjoy.jpg'
import lannisterBanner from '../images/house_banners/house-lannister.jpg'
import targaryenBanner from '../images/house_banners/house-targaryen.jpg'
import tyrellBanner from '../images/house_banners/house-tyrell.jpg'
import tullyBanner from '../images/house_banners/house-tully.jpg'
import arrynBanner from '../images/house_banners/house-arryn.jpg'
import baratheonBanner from '../images/house_banners/house-baratheon.jpg'
import martellBanner from '../images/house_banners/house-martell.jpg'
import freyBanner from '../images/house_banners/house-frey.jpg'

export class Home extends Component {
  componentDidMount(){
    objectFitImages();
    jarallax(document.querySelectorAll('.jarallax'));
    jarallax(document.querySelectorAll('.jarallax-keep-img'), {
        keepImg: true,
    });
  }

  render() {
    return (
      <main className="got_main">
        <SnowStorm animationInterval="40"/>
        {/* starks */}
        <div className="view jarallax">
          <img className="jarallax-img" src={starkBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title stark">House Stark</h2>
              <p align="justify" className="got_house_desc">
              House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.
              </p>
              <p align="justify" className="got_house_desc">
              Their rule in the North seemingly ended after the events of the Red Wedding when House Frey and House Bolton betrayed House Stark after forming a secret alliance with House Lannister, during which Roose Bolton murdered King Robb Stark. Both the North and Winterfell were taken over by House Bolton. However, the Bolton's hold was jeopardized when Sansa Stark escaped their clutches after learning her brothers Bran and Rickon Stark were still alive and reunited with her half-brother Jon Snow at Castle Black. Sansa and Jon marched on the Boltons to save their younger brother Rickon, who was later murdered by Ramsay Bolton, and retake their family home Winterfell. House Stark was restored to their former stature after the Battle of the Bastards. The Stark victory led to House Stark's return to royal status in the North with their bannermen declaring Ned Stark's illegitimate son Jon Snow as the King in the North. He later abdicated his title as king in order to gain the full support of Daenerys Targaryen in the Great War, becoming the Warden of the North.
              </p>
              <p align="justify" className="got_house_desc">
              House Stark's sigil is a grey direwolf on a white background, over a green escutcheon. They are one of the few noble Houses whose family motto is not a boast or threat. Instead, the House Stark family motto is a warning, one that, no matter the circumstances, will always be relevant: "Winter Is Coming."
              </p>
              <i align="justify" className="got_house_desc quote">
              "You were born in the long summer, you've never known anything else. But now winter is truly coming. In the winter, we must protect ourselves, look after one another."
              <br/>— Lord Eddard Stark and his daughter Arya
              </i>
            </div>
          </div>
        </div>

        {/* lannisters */}
        <div className="view jarallax">
          <img className="jarallax-img" src={lannisterBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title lannister">House Lannister</h2>
              <p align="justify" className="got_house_desc">
              House Lannister of Casterly Rock is one of the Great Houses of Westeros, one of its richest and most powerful families and oldest dynasties. It is also the current royal house of the Seven Kingdoms following the extinction of House Baratheon of King's Landing, which had been their puppet house during the War of the Five Kings.              
              </p>
              <p align="justify" className="got_house_desc">
              The Lannisters rule over the Westerlands. Their seat is Casterly Rock, a massive rocky promontory overlooking the Sunset Sea which has had habitations and fortifications built into it over the millennia. They are the Lords Paramount of the Westerlands and Wardens of the West. As the new royal house, they also rule directly over the Crownlands from their seat of the Red Keep in King's Landing, the traditional seat of the royal family. House Lannister's Heraldry consists of a golden lion on a crimson background, and their House words are "Hear me roar!", which are rarely mentioned. Their unofficial motto, which is as well known as the official one, is "A Lannister always pays his debts" - which is used much more often and mostly in negative context, though it can also be used in the original, literal sense.              
              </p>
              <p align="justify" className="got_house_desc">
              The incestuous relationship of Cersei and Jaime has been concealed in a conspiracy. Their son Joffrey Baratheon has claimed the Iron Throne on the premise that he was actually fathered by the late King Robert Baratheon. Lord Tywin was a key supporter of his reign in the War of the Five Kings.
              </p>
              <i align="justify" className="got_house_desc quote">
              "You have to give it to the Lannisters – they may be the most pompous, ponderous cunts the gods ever suffered to walk the world, but they do have outrageous amounts of money."
              <br/> ―Renly Baratheon
              </i>
            </div>
          </div>
        </div>

        {/* Targaryen */}
        <div className="view jarallax">
          <img className="jarallax-img" src={targaryenBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title targaryen">House Targaryen</h2>
              <p align="justify" className="got_house_desc">
              House Targaryen of Dragonstone is a Great House of Westeros and was the ruling royal House of the Seven Kingdoms for three centuries since it conquered and unified the realm, before it was deposed during Robert's Rebellion and House Baratheon replaced it as the new royal House. The two surviving Targaryens fled into exile to the Free Cities of Essos across the Narrow Sea. Currently based on Dragonstone off of the eastern coast of Westeros, House Targaryen seeks to retake the Seven Kingdoms from House Lannister, who formally replaced House Baratheon as the royal House following the destruction of the Great Sept of Baelor.            
              </p>
              <p align="justify" className="got_house_desc">
              House Targaryen's sigil is a three-headed red dragon on a black background, and their house words are "Fire and Blood."              
              </p>
              <i align="justify" className="got_house_desc quote">
              "Half the Targaryens went mad, didn't they? What's the saying? 'Every time a Targaryen is born the gods flip a coin.'"
               <br/> ―Cersei Lannister to Tyrion Lannister
              </i>
            </div>
          </div>
        </div>

        {/* Tyrell */}
        <div className="view jarallax">
          <img className="jarallax-img" src={tyrellBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title tyrell">House Tyrell</h2>
              <p align="justify" className="got_house_desc">
              House Tyrell of Highgarden is an extinct Great House of Westeros. It ruled over the Reach, a vast, fertile, and heavily-populated region of southwestern Westeros, from their castle-seat of Highgarden as Lords Paramount of the Reach and Wardens of the South after taking control of the region from House Gardener during the Targaryen conquest.
              </p>
              <p align="justify" className="got_house_desc">
              The House was formerly led by Lord Mace Tyrell. Mace's son Loras was a noted tournament knight and, secretly, the lover of Lord Renly Baratheon. Mace's daughter Margaery married Renly when he crowned himself king in the War of the Five Kings to cement an alliance between Renly and her father. Following Renly's death, Margaery was then married to King Joffrey Baratheon before his assassination at his wedding feast. She was then married to his younger brother, King Tommen Baratheon. Mace's mother, the indomitable Olenna Tyrell, assumed House Tyrell's lordship after Margaery, Loras, and Mace Tyrell were all killed by wildfire at the destruction of the Great Sept of Baelor. Under Olenna, House Tyrell realigned itself with House Targaryen and declared for Daenerys Targaryen in opposition against Cersei Lannister, who had orchestrated the downfall of House Tyrell. With the death of Olenna after the Sack of Highgarden, the House has officially become extinct.
              </p>
              <p align="justify" className="got_house_desc">
              The Tyrell sigil is a golden rose on a pale green field. Their house words are "Growing Strong."
              </p>
              <i align="justify" className="got_house_desc quote">
              "Luckily for us Tyrells, our blood runs quite warm."
              <br/> ―Margaery Tyrell
              </i>
            </div>
          </div>
        </div>

        {/* greyjoys */}
        <div className="view jarallax">
          <img className="jarallax-img" src={greyjoyBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title greyjoy">House Greyjoy</h2>
              <p align="justify" className="got_house_desc">
              House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.
              </p>
              <p align="justify" className="got_house_desc">
              House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.
              </p>
              <p align="justify" className="got_house_desc">
              House Greyjoy had been in open rebellion against the Iron Throne since the War of the Five Kings, during which it sought independence for the Iron Islands once more. However, following the death of King Balon Greyjoy and the election of his brother, Euron, as the new King of the Iron Islands, House Greyjoy was divided between Euron and his followers, and Balon's surviving children, Yara and Theon, and their followers. Yara's faction, which had aligned with House Targaryen, was defeated by Euron, who has aligned himself with House Lannister upon the beginning of Daenerys Targaryen's invasion of Westeros.
              </p>
              <i align="justify" className="got_house_desc quote">
              "We are ironborn. We're not subjects, we're not slaves. We do not plow the field or toil in the mine. We take what is ours."
              <br/> ―Balon Greyjoy
              </i>
            </div>
          </div>
        </div>
      
        {/* Tully */}
        <div className="view jarallax">
          <img className="jarallax-img" src={tullyBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title tully">House Tully</h2>
              <p align="justify" className="got_house_desc">
              House Tully of Riverrun is a deposed Great House of Westeros. Its most senior member carried the title of Lord of Riverrun and Lord Paramount of the Trident, until the Red Wedding. The current head is Lord Edmure Tully, son of the late Hoster Tully. The Tully sigil is a silver trout on a red and blue background. Their house words are "Family, Duty, Honor."
              </p>
              <p align="justify" className="got_house_desc">
              At the onset of the War of the Five Kings, House Tully came under attack by House Lannister and lent its support for House Stark when they came to their aid in the liberation of the Riverlands. House Tully has since been formally stripped of lands and titles for rebellion against the Iron Throne, with Lord Edmure a captive of House Frey following the Red Wedding. 
              </p>
              <p align="justify" className="got_house_desc">
              Later, Ser Brynden Tully gathered the remaining Tully forces and reclaimed Riverrun from the Freys, reopening conflict between the Tullys and the Iron Throne. The Freys lay siege to Riverrun, and were later assisted by the Lannisters on the orders of King Tommen I. Ser Jaime Lannister managed to end the siege by convincing Edmure Tully to command the garrison to lay down their weapons in return for clemency and protection. Brynden was killed during a final stand with Lannister and Frey forces while Edmure was returned to the Freys as a prisoner.
              </p>
              <i align="justify" className="got_house_desc quote">
              "'Family, Duty, Honor.' Every Tully child learns our words. But I was a woman before I understood them."
              <br/> ―Catelyn Tully
              </i>
            </div>
          </div>
        </div>

        {/* Arryn */}
        <div className="view jarallax">
          <img className="jarallax-img" src={arrynBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title arryn">House Arryn</h2>
              <p align="justify" className="got_house_desc">
              House Arryn of the Eyrie is one of the Great Houses of Westeros. It has ruled over the Vale of Arryn for millennia, originally as the Kings of Mountain and Vale and more recently as Lords Paramount of the Vale and Wardens of the East under the Targaryen kings and Baratheon-Lannister kings. The nominal head of House Arryn is Robin Arryn, the Lord of the Eyrie, with his stepfather Petyr Baelish acting as Lord Protector until he reaches the age of majority.
              </p>
              <p align="justify" className="got_house_desc">
              Their lands are in the central-eastern region of the continent. Their seat is the Eyrie, ancestral seat of the Mountain Kings. House Arryn's sigil is a white crescent moon and falcon on a blue field. Their house words are "As High as Honor."
              </p>
              <p align="justify" className="got_house_desc">
              At the start of the series, Lord Jon Arryn was killed under suspicious circumstances. His widow Lysa blamed House Lannister and sought refuge in the Eyrie. Despite her enmity towards the Lannisters, she remained neutral in the War of the Five Kings and aimed to use the forces of the Vale to defend Robin and the Eyrie if necessary. After killing Lysa and making it appear like an accident, Lord Petyr Baelish becomes Lord Protector of the Vale until young Robin comes of age. Under his rule, supervised by Baelish, the Vale assists House Stark in toppling House Bolton in the North during the Battle of the Bastards. After the battle, the Vale declares for House Stark and becomes part of the Kingdom of the North in defiance of the Iron Throne.
              </p>
              <i align="justify" className="got_house_desc quote">
              "The Arryns are direct descendants of Andal invaders... who sailed across the Narrow Sea and came ashore at the Fingers."
              <br/> ―Catelyn Stark
              </i>
            </div>
          </div>
        </div>

        {/* baratheon */}
        <div className="view jarallax">
          <img className="jarallax-img" src={baratheonBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title baratheon">House Baratheon</h2>
              <p align="justify" className="got_house_desc">
              House Baratheon of Storm's End is a legally extinct Great House of Westeros. A cadet branch was formerly the royal house, but House Lannister now controls the throne. House Baratheon traditionally ruled the Stormlands on the eastern coast of Westeros, aptly named for its frequent storms, from their seat of Storm's End.
              </p>
              <p align="justify" className="got_house_desc">
              House Baratheon became the royal house of the Seven Kingdoms after Robert Baratheon led a rebellion against the Targaryen dynasty. At the end of the rebellion, Robert ascended the Iron Throne as Robert I and married Cersei Lannister after the death of Lyanna Stark.
              </p>
              <p align="justify" className="got_house_desc">
              House Baratheon's sigil is a crowned black stag on a gold background and their house words are "Ours Is the Fury."
              </p>
              <p align="justify" className="got_house_desc">
              House Baratheon is now legally extinct due to Stannis Baratheon's death, but the family bloodline lives on through Gendry, an unrecognized bastard son of Robert Baratheon and the last known living person with true blood ties to the Baratheon family.
              </p>
              <i align="justify" className="got_house_desc quote">
              Ours Is The Fury. These are the words of the black stag of Baratheon; a battle cry echoed throughout the land in rebellion when I, Robert Baratheon, the First of His Name seized the Iron Throne from the Mad King, Aerys Targaryen, ending a dynasty nearly three-hundred years old."
              <br/> ―Robert Baratheon
              </i>
            </div>
          </div>
        </div>

        {/* martell */}
        <div className="view jarallax">
          <img className="jarallax-img" src={martellBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title martell">House Martell</h2>
              <p align="justify" className="got_house_desc">
              House Martell of Sunspear is a legally extinct Great House of Westeros. It ruled the peninsula of Dorne in the far south of the continent from their castle Sunspear. Though loyal to the Iron Throne, the Martells were never conquered by the Targaryens and pursued a more isolated role in wider political events since Robert's Rebellion.
              </p>
              <p align="justify" className="got_house_desc">
              House Martell's sigil is a red sun pierced by a golden spear, on an orange field, a combination of the original Martell sigil - a yellow spear - and the emblem of Princess Nymeria - a red sun - to symbolize the marriage of the warrior-queen to Mors Martell. Their house words are "Unbowed, Unbent, Unbroken."
              </p>
              <p align="justify" className="got_house_desc">
              With the assassinations of Prince Doran Martell and his only heir, Prince Trystane, by Ellaria Sand and the three eldest Sand Snakes, House Martell is legally extinct, although the Sand Snakes carry Martell blood through their father Oberyn Martell. The Sand Snakes also continue to use the Martell sigil to represent themselves and Dorne.
              </p>
              <p align="justify" className="got_house_desc">
              Under the leadership of Ellaria Sand and the Sand Snakes, the forces of House Martell and Dorne have aligned to support the cause of Daenerys Targaryen against House Lannister after they declared war against them.
              </p>
              <p align="justify" className="got_house_desc">
              Since the deaths of the older Sand Snakes and Ellaria's imprisonment in King's Landing, House Martell's future is uncertain as five Sand Snakes still live.
              </p>
              <i align="justify" className="got_house_desc quote">
              "'Unbowed, unbent, unbroken'. The words of House Martell. A promise to our enemies, and a challenge to our lovers."
              <br/> ―Oberyn Martell
              </i>
            </div>
          </div>
        </div>

         {/* frey */}
         <div className="view jarallax">
          <img className="jarallax-img" src={freyBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mt-3 mb-3 pb-4">
            <div className="col-md-12 text-center">
              <h2 className="got_house_title frey">House Frey</h2>
              <p align="justify" className="got_house_desc">
              House Frey of the Twins is the Great House of the Riverlands, having gained their position for their treachery against their former liege lords, House Tully, who were stripped of all their lands and titles for their rebellion against the Iron Throne; House Tully had supported the independence movement for the Kingdom of the North. The current head of the house is unknown following the assassinations of Lord Walder Frey and two of his sons, Lothar Frey and Walder Rivers, by the vengeful Arya Stark. This is made more complex by the subsequent assassination of all the male Freys soon after.
              </p>
              <p align="justify" className="got_house_desc">
              Their ancestral seat is known as the Twins for its two identical keeps on both sides of a river linked by a bridge, sometimes called the Stone Bridge. The Twins is one of the primary crossings over the Green Fork of the Trident River, and tolls from bridge crossings have made the Freys quite wealthy fairly quickly, elevating them from obscurity six centuries ago to being one of the most powerful noble houses in the Riverlands - though they are looked down upon by older aristocratic families. The construction of the Twins took the Freys for three centuries, and ever since they have grown wealthy by charging the travelers crossing the Twins.
              </p>
              <p align="justify" className="got_house_desc">
              The heraldry of House Frey represents their castle-seat of the Twins: it consists of two grey towers linked by a bridge, on a darker grey background, over an escutcheon of blue water. Their house words are "We Stand Together," ironic considering the Freys' frequent infighting between family members, but it could also refer to their seat, the Twins, standing together.
              </p>
              <i align="justify" className="got_house_desc quote">
              "The Freys have held the Crossing for 600 years, and for 600 years they have never failed to exact their toll."
              <br/> ―Catelyn Stark
              </i>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Home

