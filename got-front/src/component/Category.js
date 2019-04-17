import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import General from '../images/house_icons/Tyrell-icon.png' 
import Stark from '../images/house_icons/Stark-icon.png' 
import Baratheon from '../images/house_icons/Baratheon-icon.png' 
import Targaryen from '../images/house_icons/Targaryen-icon.png' 
import Lannister from '../images/house_icons/Lannister-icon.png'
import Other from '../images/house_icons/Martell-icon.png' 
import Off_Topic from '../images/house_icons/Arryn-icon.png' 
import Feed from '../component/Feed'

export const Category = (props) => {
    const { categories, profiles, posts } = props
    const families = [General, Stark, Baratheon, Targaryen, Lannister, Other, Off_Topic]
    const descriptions = ["Have fun discussing about all of Westeros!",
                          "Winter is Coming!",
                          "Ours is the Fury!",
                          "Fire and Blood",
                          "Hear Me Roar!",
                          "Other things about GoT",
                          "Anything not related to GoT"]
    return (
      <div className="fb_main">
      <Feed posts={posts} profiles={profiles}/>
      <h1>Forums</h1>
      <ul className="fb_list">
          {categories.map(category => 
          category.id % 2 === 0 ?
            <li key={category.id} className="fb_body even">
                <img className="fb_icon" src={families[category.id-1]} alt=""></img>
                <div className="fb_desc">
                  <Link className="fb_title" to={`/forum/${category.id}`}>
                    {category.title}
                  </Link>
                  <p className="fb_subtitle">{descriptions[category.id-1]}</p>
                </div>
            </li>
            :
            <li key={category.id} className="fb_body ">
            <img className="fb_icon" src={families[category.id-1]} alt=""></img>
            <div className="fb_desc">
              <Link className="fb_title" to={`/forum/${category.id}`}>
                {category.title}
              </Link>
              <p className="fb_subtitle">{descriptions[category.id-1]}</p>
            </div>
        </li>
          )}
      </ul>
      </div>       
    )
}
              

export default withRouter(Category)
