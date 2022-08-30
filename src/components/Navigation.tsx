import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faArrowsLeftRight, faBridge, faCircleNodes, faClone, faHouse, faSackDollar, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navigation = () => {
  const router = useRouter()
  const links = [
    {
      path: '/',
      title: 'Overview',
      icon: faHouse
    },
    {
      path: '/users',
      title: 'Users',
      icon: faUser
    },
    {
      path: '/transactions',
      title: 'Transactions',
      icon: faArrowRightArrowLeft
    },
    {
      path: '/validators',
      title: 'Validators',
      icon: faCircleNodes
    },
    {
      path: '/projects',
      title: 'New Projects',
      icon: faClone
    },
    {
      path: '/volume',
      title: 'Volume',
      icon: faSackDollar
    },
    {
      path: '/bridge',
      title: 'Bridge',
      icon: faBridge
    },
    {
      path: '/comparison',
      title: 'Comparison',
      icon: faArrowsLeftRight
    }
  ]
  return (
      <ul className="navigation">
        {
          links.map(link => (
            <li key={link.path}>
              <Link href={link.path} passHref={true}>
                <a className={router.pathname === link.path.toLowerCase() ? 'sidebar-selected' : ''}>
                  <FontAwesomeIcon icon={link.icon} />
                  {link.title}
                </a>
              </Link>
            </li>
          ))
        }
      </ul>
  )
}

export default Navigation
