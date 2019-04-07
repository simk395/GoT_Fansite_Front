import React from 'react'
import { Link } from 'react-router-dom'


export const Category = (props) => {
    const { categories } = props
    return (
      <div className="forum__categories">
        <ul className="forum__categories__list">
          {categories.map(category => <li className="forum__categories__items"><Link className="category__item" to={`/forum/${category.id}`}>{category.title}</Link></li>)}
        </ul>
      </div>
    )
}

export default Category
