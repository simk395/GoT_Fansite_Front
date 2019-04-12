import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import General from '../images/Tyrell-icon.png' 
import Stark from '../images/Stark-icon.png' 
import Baratheon from '../images/Baratheon-icon.png' 
import Targaryen from '../images/Targaryen-icon.png' 
import Lannister from '../images/Lannister-icon.png'
import Other from '../images/Martell-icon.png' 
import Off_Topic from '../images/Arryn-icon.png' 

export const Category = (props) => {
    const { categories } = props
    const families = [General, Stark, Baratheon, Targaryen, Lannister, Other, Off_Topic]
    const descriptions = ["Have fun discussing about all of Westeros!",
                          "Winter is Coming!",
                          "Ours is the Fury!",
                          "Fire and Blood",
                          "Hear Me Roar!",
                          "Other things about GoT",
                          "Anything not related to GoT"]
    return (
      <div className="forum_cat">
      <ul className="forum_cat_list">
          {categories.map(category => 
          category.id % 2 === 0 ?
            <li className="forum_cat_body even">
                <img className="forum_cat_icon" src={families[category.id-1]}></img>
                <div className="forum_cat_desc">
                  <Link className="forum_cat_title" to={`/forum/${category.id}`}>
                    {category.title}
                  </Link>
                  <p className="forum_cat_subtitle">{descriptions[category.id-1]}</p>
                </div>
            </li>
            :
            <li className="forum_cat_body odd">
            <img className="forum_cat_icon" src={families[category.id-1]}></img>
            <div className="forum_cat_desc">
              <Link className="forum_cat_title" to={`/forum/${category.id}`}>
                {category.title}
              </Link>
              <p className="forum_cat_subtitle">{descriptions[category.id-1]}</p>
            </div>
        </li>
          )}
      </ul>
      </div>       
    )
}
              

export default withRouter(Category)
