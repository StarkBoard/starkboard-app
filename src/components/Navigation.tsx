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
      path: '/volume',
      title: 'Volume',
      icon: faSackDollar
    },
    {
      path: '/validators',
      title: 'Validators',
      icon: faCircleNodes,
      disabled: true
    },
    {
      path: '/projects',
      title: 'New Projects',
      icon: faClone,
      disabled: true
    },
    {
      path: '/bridge',
      title: 'Bridge',
      icon: faBridge,
      disabled: true
    },
    {
      path: '/comparison',
      title: 'Comparison',
      icon: faArrowsLeftRight,
      disabled: true
    }
  ]
  return (
    <ul className="navigation">
      {
        links.map(link => (
          <li key={link.path}>
            {
              link.disabled
                ? (
                <span><FontAwesomeIcon icon={link.icon} />
                  {link.title}</span>
                  )
                : (
                <Link href={link.path} passHref={true}>
                  <a className={router.pathname === link.path.toLowerCase() ? 'sidebar-selected' : ''}>
                    <FontAwesomeIcon icon={link.icon} />
                    {link.title}
                  </a>
                </Link>
                  )
            }
          </li>
        ))
      }
    </ul>
  )
}

export default Navigation
