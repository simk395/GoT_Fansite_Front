import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
// import { Carousel } from 'react-materialize'
import baratheon from '../images/baratheon-home.jpg'
import stark from '../images/stark-home.jpg'
import targ from '../images/targaryen.jpg'
import objectFitImages from 'object-fit-images'
import { jarallax } from 'jarallax'
import starkBanner from '../images/house_banners/house-stark.jpg'
import greyjoyBanner from '../images/house_banners/house-greyjoy.jpg'

export class Home extends Component {

  componentDidMount(){
    // window.addEventListener("scroll", this.handleScroll)
    objectFitImages();
    jarallax(document.querySelectorAll('.jarallax'));
    jarallax(document.querySelectorAll('.jarallax-keep-img'), {
        keepImg: true,
    });
  }

  // handleScroll = () => {
  //   const carousel = document.querySelector(".got_slideshow");
  //   const image = document.querySelectorAll(".got_slideshow_img");
  //   if(window.scrollY > 0){
  //     carousel.classList.add("move_back");
  //     image.forEach(picture => picture.classList.add("blur_it"))
  //   }else{
  //     carousel.classList.remove("move_back");
  //     image.forEach(picture => picture.classList.remove("blur_it"))
  //   }
  // }
  render() {
    const images = [stark, baratheon, targ]
    return (
      
      
      <main>
        
        {/* starks */}
        <div className="view jarallax">
          <img className="jarallax-img" src={starkBanner} alt=""/>
        </div>

        <div className="container">
          <div className="row mb-5 pb-4">
            <div className="col-md-12 text-center">
              <h2>House Stark</h2>
              <p align="justify">
              House Stark of Winterfell is a Great House of Westeros, ruling over the vast region known as the North from their seat in Winterfell. It is one of the oldest lines of Westerosi nobility by far, claiming a line of descent stretching back over eight thousand years. Before the Targaryen conquest, as well as during the War of the Five Kings and Daenerys Targaryen's invasion of Westeros, the leaders of House Stark ruled over the region as the Kings in the North.
              </p>
              <p align="justify">
              Their rule in the North seemingly ended after the events of the Red Wedding when House Frey and House Bolton betrayed House Stark after forming a secret alliance with House Lannister, during which Roose Bolton murdered King Robb Stark. Both the North and Winterfell were taken over by House Bolton. However, the Bolton's hold was jeopardized when Sansa Stark escaped their clutches after learning her brothers Bran and Rickon Stark were still alive and reunited with her half-brother Jon Snow at Castle Black. Sansa and Jon marched on the Boltons to save their younger brother Rickon, who was later murdered by Ramsay Bolton, and retake their family home Winterfell. House Stark was restored to their former stature after the Battle of the Bastards. The Stark victory led to House Stark's return to royal status in the North with their bannermen declaring Ned Stark's illegitimate son Jon Snow as the King in the North. He later abdicated his title as king in order to gain the full support of Daenerys Targaryen in the Great War, becoming the Warden of the North.
              </p>
              <p align="justify">
              House Stark's sigil is a grey direwolf on a white background, over a green escutcheon. They are one of the few noble Houses whose family motto is not a boast or threat. Instead, the House Stark family motto is a warning, one that, no matter the circumstances, will always be relevant: "Winter Is Coming."
              </p>
              <p align="justify">
              "You were born in the long summer, you've never known anything else. But now winter is truly coming. In the winter, we must protect ourselves, look after one another."
              — Lord Eddard Stark and his daughter Arya
              </p>
            </div>
          </div>
        </div>


        {/* greyjoys */}
        <div className="view jarallax">
          <img className="jarallax-img" src={greyjoyBanner}/>
        </div>

        <div className="container">
          <div className="row mb-5 pb-4">
            <div className="col-md-12 text-center">
              <h2>House Greyjoy</h2>
              <p align="justify">
              House Greyjoy of Pyke is one of the Great Houses of Westeros. It rules over the Iron Islands, a harsh and bleak collection of islands off the west coast of Westeros, from the castle at Pyke. The head of the house is the Lord Reaper of Pyke.
              </p>
              <p align="justify">
              House Greyjoy's sigil is traditionally a golden kraken on a black field. Their house words are "We Do Not Sow," although the phrase "What Is Dead May Never Die" is also closely associated with House Greyjoy and their bannermen, as they are associated with the faith of the Drowned God.
              </p>
              <p align="justify">
              House Greyjoy had been in open rebellion against the Iron Throne since the War of the Five Kings, during which it sought independence for the Iron Islands once more. However, following the death of King Balon Greyjoy and the election of his brother, Euron, as the new King of the Iron Islands, House Greyjoy was divided between Euron and his followers, and Balon's surviving children, Yara and Theon, and their followers. Yara's faction, which had aligned with House Targaryen, was defeated by Euron, who has aligned himself with House Lannister upon the beginning of Daenerys Targaryen's invasion of Westeros.
              </p>
              <p align="justify">
              "We are ironborn. We're not subjects, we're not slaves. We do not plow the field or toil in the mine. We take what is ours."
              ―Balon Greyjoy
              </p>
            </div>
          </div>
        </div>
      
      </main>
    )
  }
}

export default Home

