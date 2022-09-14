/* eslint-disable @next/next/no-img-element */
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Loader from 'components/Loader'
import React from 'react'
import { useSelector } from 'react-redux'
import { EcosystemState } from 'store/reducers/ecosystem.slice'
import { RootState } from 'store/store'
import { formatValue } from 'utils/helpers/format'

const Ecosystem = () => {
  const { loading: fetchingData, projects } = useSelector<RootState, EcosystemState>(state => state.ecosystem)
  const loading = fetchingData || projects.length === 0

  const content = (
    <div className="row justify-content-between">
      {
        projects.map((project, index) => (
          <div className={`col-12 col-lg-4 px-2 ${index === 0 ? 'mt-0' : index < 3 ? 'mt-3 mt-lg-0' : 'mt-3'}`} key={project.application}>
            <div className="black-gradient rounded ecosystem-card">
              <div className="ecosystem-header">
                {
                  project.banner_picture_url && (
                    <img alt="Project Banner" src={project.banner_picture_url} className='ecosystem-image mb-1' />
                  )
                }
                {
                  project.profile_picture_url && (
                    <img src={project.profile_picture_url} alt="Project Logo" className='ecosystem-logo' />
                  )
                }
                <div className="flex flex-row justify-content-center">
                  <h3 className={`text-white text-center ${project.profile_picture_url ? 'mt-5' : 'mt-4'}`}>{project.application}</h3>
                </div>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-6">
                  <p className="ecosystem-data-title">Followers</p>
                  <p className="ecosystem-data-value">{formatValue(project.countFollowers)}</p>
                </div>
                <div className="col-6">
                  <p className="ecosystem-data-title">On Chain Users</p>
                  <p className="ecosystem-data-value">SOON</p>
                </div>
              </div>
              <div className="row mx-2 mt-3">
                <div className="col">
                  <p className="ecosystem-data-title">Tags</p>
                </div>
              </div>
              <div className="row mx-2 mt-2 ecosystem-pills">
                <div>
                  {
                    project.tags.map((tag) => (
                      <span key={tag} className={`${tag.toLowerCase().replace(' ', '_')}-pill text-center`}>{tag.toUpperCase().replace('_', ' ')}</span>
                    ))
                  }
                </div>
              </div>
              <div className="row mx-2 mt-3">
                <div className="col-8">
                  <div className="ecosystem-splitter" />
                </div>
              </div>
              <div className="row mx-2 mt-3 mb-3">
                <div className="col flex flex-row ecosystem-icons">
                  {
                    project.twitter && (
                      <a href={project.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                    )
                  }
                  {
                    project.discord && (
                      <a href={project.discord} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
                    )
                  }
                  {
                    project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    )
                  }
                  {
                    project.website && (
                      <a href={project.website} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGlobe} /></a>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
  return (
    <>
      <h2 className="ps-0 pb-4 page-title">Ecosystem</h2>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Ecosystem
