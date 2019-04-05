import React from 'react'
import { Link } from 'react-router-dom'


export const Category = (props) => {
    const { categories } = props
    return (
      <div>
        <ul className="categories">
          {categories.map(category => <li><Link className="category__item" to={`/forum/${category.id}`}>{category.title}</Link></li>)}
        </ul>
      </div>
    )
}

export default Category
